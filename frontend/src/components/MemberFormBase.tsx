import React from "react"
import useAxios from "axios-hooks";

import { CancelBtn } from "./CancelBtn";
import { Save } from "./DataUpdater";
import SaveBtn from "./SaveBtn";

import { onRenderCallback } from "../interfaces";
import { clearMemberAndPopView, isEmptyObject } from "../services";
import { EditProps } from "./EditMember";
import { getServerUrl } from "../services";
import { IMemberDocument, IVolunteer } from "member-document";
import { Member, FormError } from "fe-member";
import { MemberViewStates } from "../interfaces";
import { MemberFormBaseGroup } from "./MemberFormBaseGroup";
import { MemberFormMmbGroup } from "./MemberFormMmbGroup";
import { MemberFormRemitGroup } from "./MemberFormRemitGroup";
import { MemberFormVolGroup } from "./MemberFormVolGroup";
import { MemberService } from "../services/index";


const getFormProblems = (_memberObj: Member | undefined): Array<FormError> | null => {
  if (_memberObj) {
    console.log(`prior to checking the error array is \n    ${JSON.stringify(_memberObj.dataEntryErrors)}`);
    let isUpdateFormErrorsNeeded = false;
    let errArr = new Array<FormError>();
    if (_memberObj?.firstName === "") {
      const firstNameErrorMsg = `First name cannot be empty`;
      errArr.push({ target: "first-name", message: `${firstNameErrorMsg}`, level: "error" });
      isUpdateFormErrorsNeeded = true;
    } else if (_memberObj.existingFirstNameError()) {
      isUpdateFormErrorsNeeded = true;
    }
    if (_memberObj?.lastName === "") {
      const lastNameErrorMsg = `Last name cannot be empty`;
      errArr.push({ target: "last-name", message: `${lastNameErrorMsg}`, level: "error" });
      isUpdateFormErrorsNeeded = true;
    } else if (_memberObj.existingLastNameError()) {
      isUpdateFormErrorsNeeded = true;
    }
    if (!_memberObj.remitDate && (_memberObj.remitDues !== "" || _memberObj.remitDonation !== "")) {
      const remitErrorMsg = `Remittance date must contain a value`;
      errArr.push({ target: "money-date", message: `${remitErrorMsg}`, level: "error" });
      isUpdateFormErrorsNeeded = true;
    } else if (_memberObj.existingRemitDateError()) {
      isUpdateFormErrorsNeeded = true;
    }
    if (_memberObj.remitDate && (_memberObj.remitDues === "" && _memberObj.remitDonation === "")) {
      const remitWarnMsg = `Please provide remittance value(s)`
      errArr.push({ target: "money-donation", message: `${remitWarnMsg}`, level: "warn" });
      isUpdateFormErrorsNeeded = true;
    } else if (_memberObj.existingRemitAmountWarn()) {
      isUpdateFormErrorsNeeded = true;
    }

    console.log(`error array is ${isUpdateFormErrorsNeeded ? "updated" : "same"}\n    ${JSON.stringify(errArr)}`);
    if (isUpdateFormErrorsNeeded) {
      return errArr;
    } else {
      return null;
    }
  }
  return null;
}

export const oldMemberStateToNew = (oldObj: Member, chgObj: Partial<Member>) => {
  const newMemberObj = Member.create();

  const someObj = { ...oldObj, ...chgObj }
  for (const k in someObj) {
    if (Object.hasOwn(newMemberObj, k)) {
      newMemberObj[k as keyof Member] = someObj[k as keyof Member];
    }
  }
  return newMemberObj;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const replacerFunc = () => {
  const visited = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};


export const MemberFormBase = ({ getAppState, setAppState }: EditProps): JSX.Element => {

  const memberId = getAppState().memberId;
  const mode = getAppState().viewStateStack[0];
  console.log(`url: /members/${memberId}`);
  const [{ data, error, loading }] = useAxios<IMemberDocument[]>(
    { baseURL: getServerUrl(), url: `/members/${memberId}` }, { manual: false, useCache: false }
  );

  const haveData = !isEmptyObject(data as Object);

  const [memberObj, setMemberObj] = React.useState<Member>({} as Member);

  React.useEffect(() => {
    setMemberObj(MemberService.createMemberFromLoad(data as unknown as IMemberDocument, mode));
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [haveData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;


  const setFormErrors = (newErrArr: Array<FormError>) => {
    setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _dataEntryErrors: [...newErrArr] } as Partial<Member>)));
  }

  function handleFormSave(): any {
    console.log(`Saving changes for ${(memberObj.id === "") ? "NEW MEMBER" : memberId}`)

    const formErrors: Array<FormError> | null = getFormProblems(memberObj);
    if (formErrors) {
      console.log(`current form errors preventing save: ${memberObj.getFormErrorsForDisplay()}`);
      setFormErrors(formErrors);
    } else {
      // check to see if a new member has address and other status settings
      if (memberObj.id === "" && memberObj.status) {
        if (memberObj.address === ""
          || memberObj.city === ""
          || memberObj.state === ""
          || memberObj.postalCode === "") {
          memberObj.status.validPostMail = "none";
        }
        if (!memberObj.email || memberObj.email === "") {
          memberObj.status.validEmail = 'unchecked';
        }
        if (!memberObj.status.validEmail && !memberObj.status.validPostMail) {
          memberObj.status.newsletterType = 'none';
        } else if (!memberObj.status.validEmail && memberObj.status.validPostMail) {
          memberObj.status.newsletterType = 'post';
        } else {
          memberObj.status.newsletterType = 'email';
        }
        if (!memberObj.volunteerPreferences) {
          memberObj.volunteerPreferences = Array<IVolunteer>();
        }
      }
      //  memberObj object is not quite ready for commit -- postUnjournalledRemits makes final changes
      //  - putting entered remits into the remittances array
      //  - updating mmb, paidThrough, and joined as appropriate
      const readyMemberobj = MemberService.postUnjournalledRemits(memberObj);
      console.log(`before: ${JSON.stringify(memberObj)}`);
      console.log(`after: ${JSON.stringify(readyMemberobj)}`);

      const memberObjToSave = readyMemberobj.toIMember();

      if (memberObjToSave) {
        Save(getServerUrl(), memberObjToSave, memberId)
          .then((savRes) => {
            savRes && console.log(`member-form--handlesave status -- ${savRes.status}, errors: ${savRes?.body?.error}`)
            if ([200, 201, 204].includes(savRes.status)) {
              console.log("successful save");
              clearMemberAndPopView(getAppState(), setAppState);
            } else {
              let errArr = new Array<FormError>();
              errArr.push({ target: "any", message: savRes?.body?.error, level: "error" }); // TODO -- process this array
              setFormErrors(errArr);
            }
          }).catch((fault) => {
            throw new Error(`fault occured in Save: ${JSON.stringify(fault)}`);
          });
      } else {
        throw new Error(`cannot save an undefined IMember to DB`);
      }
    }
  }

  console.log(`building JSX \n data fetch status ${JSON.stringify(data)}`)

  if ((data && memberObj) || mode === MemberViewStates.new) {
    const formBaseGroupComponent = MemberFormBaseGroup({
      onRenderCallback,
      memberObj,
      setMemberObj,
    });
    const formMoneyGroupComponent = MemberFormRemitGroup({
      onRenderCallback,
      memberObj,
      setMemberObj
    });
    const volIsDisabled = !([MemberViewStates.new, MemberViewStates.renew].includes(mode));
    const formMmbGroupComponent = MemberFormMmbGroup(memberObj, setMemberObj, onRenderCallback);
    const formVolGroupComponent = MemberFormVolGroup(memberObj, volIsDisabled, setMemberObj, onRenderCallback);
    const pageComponents = (
      <>
        <form className="member-form" data-testid="member-form">
          {formBaseGroupComponent}
          {([MemberViewStates.new, MemberViewStates.renew].includes(mode)) && formMoneyGroupComponent}
          {formVolGroupComponent}
          {mode !== MemberViewStates.new && formMmbGroupComponent}
          <div><br></br></div>
          <div className="member-form--controls" data-testid="member-form--controls">
            <SaveBtn
              updateCurrentMember={handleFormSave}
            />
            <CancelBtn
              getAppState={getAppState}
              setAppState={setAppState}
            />
          </div>
        </form>

      </>);
    return pageComponents;
  } else {
    return <p>Error! Should never reach here</p>
  }
}

