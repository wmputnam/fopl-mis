import React from "react"

import CancelBtn from "./CancelBtn";
import SaveBtn from "./SaveBtn";

import { MemberViewStates } from "../@interfaces/enums";
import Save from "./DataUpdater";
// import { Remittance } from "packages/Remittance";
// import { nanoid } from "nanoid";
import { IMember } from "packages";
import { MemberService } from "../services/MemberService";
import { Member } from "../services/Member";
// import { IAddress } from "packages/IAddress";
import { getServerUrl } from "../services/AppConfig";
import { AppState, isEmptyObject, onRenderCallback } from "../App";
import { EditProps } from "./EditMember";
import useAxios from "axios-hooks";
import { MemberFormBaseGroup } from "./MemberFormBaseGroup";
import { MemberFormRemitGroup } from "./MemberFormRemitGroup";
import { MemberFormMmbGroup } from "./MemberFormMmbGroup";
import { MemberFormVolGroup } from "./MemberFormVolGroup";

export interface FormError {
  target: string,
  message: string,
  level: "error" | "warn" | "info"
}

const MemberFormBase = ({ memberId, mode, getAppState, setAppState }: EditProps): JSX.Element => {

  console.log(`url: /members/${memberId}`)
  const [{ data, error, loading }] = useAxios<IMember[]>(
    { baseURL: getServerUrl(), url: `/members/${memberId}` }, { manual: false, useCache: false }

  );
  const haveData = isEmptyObject(data as Object);

  const [memberObj, setMemberObj] = React.useState<Member>({} as Member);

  React.useEffect(() => {
    setMemberObj(MemberService.createMemberFromLoad(data as unknown as IMember, mode));
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [haveData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
  if (data) { }

  // const addRedBorder = (elementId: string) => {
  //   let el = document.getElementById(elementId);
  //   el?.classList.add("red-border");
  // }

  // // eslint-disable-next-line
  // const removeRedBorder = (elementId: string) => {
  //   let el = document.getElementById(elementId);
  //   el?.classList.remove("red-border");
  // }

  const areThereFormProblems = (_memberObj: Member | undefined): boolean => {
    if (_memberObj) {
      let foundErr = false;
      let isUpdateFormErrorsNeeded = false;
      let errArr = new Array<FormError>();
      if (_memberObj?.firstName === "") {
        const firstNameErrorMsg = `First name cannot be empty`;
        foundErr = true;
        // if (!memberObj.existingFirstNameError()) {
        errArr.push({ target: "first-name", message: `${firstNameErrorMsg}`, level: "error" });
        isUpdateFormErrorsNeeded = true;
        // }
      } else if (memberObj.existingFirstNameError()) {
        isUpdateFormErrorsNeeded = true;
      }
      if (_memberObj?.lastName === "") {
        const lastNameErrorMsg = `Last name cannot be empty`;
        foundErr = true;
        errArr.push({ target: "last-name", message: `${lastNameErrorMsg}`, level: "error" });
        isUpdateFormErrorsNeeded = true;
      } else if (memberObj.existingLastNameError()) {
        isUpdateFormErrorsNeeded = true;
      }
      if (!memberObj.remitDate && (memberObj.remitDues !== "" || memberObj.remitDonation !== "")) {
        foundErr = true;
        const remitErrorMsg = `Remittance date must contain a value`;
        // if (!_memberObj.existingRemitDateError()) {
        errArr.push({ target: "money-date", message: `${remitErrorMsg}`, level: "error" });
        isUpdateFormErrorsNeeded = true;
        // }
      } else if (memberObj.existingRemitDateError()) {
        isUpdateFormErrorsNeeded = true;
      }
      if (memberObj.remitDate && (memberObj.remitDues === "" && memberObj.remitDonation === "")) {
        const remitWarnMsg = `Please provide remittance value(s)`
        foundErr = true;
        // if (!_memberObj.existingRemitAmountWarn()) {
        errArr.push({ target: "money-donation", message: `${remitWarnMsg}`, level: "warn" });
        isUpdateFormErrorsNeeded = true;
        // }
      } else if (memberObj.existingRemitAmountWarn()) {
        isUpdateFormErrorsNeeded = true;
      }
      if (isUpdateFormErrorsNeeded) {
        console.log(JSON.stringify(errArr));
        setFormErrors(errArr);
      }
      return foundErr;
    }
    return false;
  }
  const setFormErrors = (newErrArr: Array<FormError>) => {
    setMemberObj((oldObj) => (oldToNew(oldObj, { _dataEntryErrors: [...newErrArr] } as Partial<Member>)));
  }

  const oldToNew = (oldObj: Member, chgObj: Partial<Member>) => {
    const newMemberObj = Member.create();
    const lupdt = new Date().valueOf();

    const someObj = { ...oldObj, ...chgObj, lastUpdated: new Date(lupdt) }
    for (const k in someObj) {
      if (Object.hasOwn(newMemberObj, k)) {
        newMemberObj[k as keyof Member] = someObj[k as keyof Member];
      }
    }
    return newMemberObj;
  }

  function handleFormSave(a: string): any {
    console.log(`Saving changes for ${memberId === "" ? "NEW MEMBER" : memberId}`)

    if (areThereFormProblems(memberObj)) {
      console.log(memberObj.getFormErrorsForDisplay());
      return { status: 500, error: `form problems` };
    }
    const memberObjToSave = memberObj.toIMember();
    //   // the new member memberData object is not ready for commit -- prepareMemberObjBeforeSave adapts inputs
    //   const memberObjToSave = prepareMemberObjBeforeSave(getCurrentMemberObj(), getFieldChanges());  }


    //     const iMemberToSave: IMember | any = memberObjToSave?.toIMember();
    if (memberObjToSave) {
      Save(getServerUrl(), memberObjToSave, memberId)
        .then((savRes) => {
          savRes && console.log(`member-form--handlesave status -- ${savRes.status}, errors: ${savRes?.body?.error}`)
          if ([200, 201, 204].includes(savRes.status)) {
            // clearFieldChangesWithSaves();
            console.log("successful save")
            setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.list }));
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

  console.log(`building JSX \n data fetch status ${JSON.stringify(data)}`)

  if ((data) || mode === MemberViewStates.new) {
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
    const formMmbGroupComponent = MemberFormMmbGroup(memberObj, onRenderCallback);
    const formVolGroupComponent = MemberFormVolGroup(memberObj, setMemberObj, onRenderCallback);
    const pageComponents = (
      <>
        <form className="member-form">
          {formBaseGroupComponent}
          {([MemberViewStates.new, MemberViewStates.renew].includes(mode)) && formMoneyGroupComponent}
          {mode === MemberViewStates.new && formVolGroupComponent}
          {mode !== MemberViewStates.new && formMmbGroupComponent}
          <div><br></br></div>
          <div className="member-form--controls">
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
    // console.log(JSON.stringify(foo, replacerFunc()));
    return pageComponents;
  } else {
    return <p>Error! Should never reach here</p>
  }

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


export default MemberFormBase;
