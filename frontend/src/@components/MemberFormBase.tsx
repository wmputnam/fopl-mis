import React from "react"

import CancelBtn from "./CancelBtn";
import SaveBtn from "./SaveBtn";

import { MemberViewStates } from "../@interfaces/enums";
import Save from "./DataUpdater";
import { Remittance } from "packages/Remittance";
import { nanoid } from "nanoid";
import { IMember } from "packages";
import { MemberService } from "../services/MemberService";
import { Member } from "../services/Member";
import { IAddress } from "packages/IAddress";
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

let fetchedData: any;
const isLoading = () => fetchedData && fetchedData[0] && fetchedData[0].loading && fetchedData[0].loading === "true";
const isLoadingErr = () => fetchedData && fetchedData[0] && fetchedData[0].loading && fetchedData[0].error === "true";



const MemberFormBase = ({ memberId, mode, getAppState, setAppState }: EditProps): JSX.Element => {

  // const LoadFromDb = (memberId: string): Array<any> => {
  //   return useAxios<IMember>(
  //     { baseURL: getServerUrl(), url: `/members/${memberId}` }, { manual: false, useCache: false }
  //   );
  // }

  // fetchedData = LoadFromDb(memberId ? memberId : "");

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

  // const mounted = React.useRef(false);

  // React.useEffect(
  //   () => {
  //     mounted.current = !mounted.current;
  //     console.log(`1. this is either mount or update ${mounted.current ? "mounted" : "unmounted"}`);
  //     return () => {
  //       console.log(`1. this an unmount ${mounted.current ? "mounted" : "unmounted"}`);
  //       mounted.current = !mounted.current;
  //     };
  //   }
  // );
  // React.useEffect(() => {
  //   console.log(`2. runs after initial mount? ${mounted.current ? "mounted" : "unmounted"}\n data fetch status ${fetchedData && fetchedData[0] && fetchedData[0]['data']}`)
  //   if (fetchedData && fetchedData[0] && fetchedData[0]['data']) {
  //     MemberService.persistMemberDataToLocalStorage(fetchedData[0]['data']);
  //   }
  //   return () => { console.log(`2. runs on unmount ${mounted.current ? "mounted" : "unmounted"}\n data fetch status ${fetchedData && fetchedData[0] && fetchedData[0]['data']}`) };
  //   // eslint-disable-next-line
  // }, []);

  // const inputsChanged: React.MutableRefObject<Set<string>> = React.useRef<Set<string>>(new Set<string>());
  // // const isDataLoaded = React.useRef(false);
  // const _loading = React.useRef<any>(isLoading());
  // if (isLoading() && loading.current !== isLoading()) {
  //   loading.current = isLoading();
  // }
  // const loadingErr = React.useRef<any>(isLoadingErr());
  // if (isLoadingErr() && loadingErr.current !== isLoadingErr()) {
  //   loadingErr.current = isLoadingErr();
  // }


  // const remitDate = React.useRef<Date | undefined>(undefined);
  // const updateRemitDate = (value: Date) => remitDate.current = value;
  // const getRemitDate = () => remitDate.current;
  // const remitDues = React.useRef<string | undefined>("");
  // const updateRemitDues = (value: string) => remitDues.current = value;
  // const getRemitDues = () => remitDues.current;
  // const remitDonation = React.useRef<string | undefined>("");
  // const updateRemitDonation = (value: string) => remitDonation.current = value;
  // const getRemitDonation = () => remitDonation.current;
  // const formErrors = React.useRef<Array<FormError>>(
  //   Array<FormError>({ target: "any", message: "i am a little teacup", level: "info" } as FormError)
  // );
  // const setFormErrors = (value: Array<FormError>) => formErrors.current = value;
  // const getFormErrors = () => formErrors.current;

  // const dataIsReady: boolean = (localStorage.getItem("loaded") ? localStorage.getItem("loaded") === "true" : false);
  //  () => {

  // }
  // );
  // const intialMemberGetter = (): Member => {
  //   if (mode === MemberViewStates.new) {

  //     || dataIsReady ? MemberService.createMemberFromLocalStorage() :};
  // const intialMember = intialMemberGetter();
  // console.log(`setting MemberObj to initialMember ${dataIsReady}`)

  // React.useEffect(() => {
  //   // let ignore = false;
  //   // if (!ignore && dataIsReady) {
  //   console.log(`3. mount or reacting to fetchedData change ${mounted.current ? "mounted" : "unmounted"} ${dataIsReady}`);
  //   // let _initialMember = MemberService.createMemberFromLocalStorage();
  //   // setMemberObj(_initialMember);
  //   return () => {
  //     // ignore = true; 
  //     console.log(`3. unmount ${mounted.current ? "mounted" : "unmounted"} ${dataIsReady}`);
  //   };
  //   // eslint-disable-next-line
  // }, [fetchedData]);
  // const getCurrentMemberObj = () => MemberService.createMemberFromLocalStorage();

  // React.useEffect(function () {
  //   console.log(`reacting to memberObj change`);
  //   // console.log(JSON.stringify(memberObj));
  //   return () => {
  //     console.log(`before reacting to memberObj change`);

  //   };
  // },
  //   [memberObj]);

  // const appState = getAppState();

  const firstNameError = () => ""; //getFormErrors().find((i) => i.target === "first-name")?.message;
  const lastNameError = () => ""; //getFormErrors().find((i) => i.target === "last-name")?.message;
  // const remitError = () => getFormErrors().find((i) => i.target === "money-date")?.message;
  // const remitWarn = () => getFormErrors().find((i) => i.target === "money-donation")?.message;

  // // eslint-disable-next-line
  // const markAnyErrantFields = (fe: FormError[]) => {
  //   if (fe && fe.length && fe.length > 0) {
  //     for (let i = 0; i < fe.length; i++) {
  //       addRedBorder(fe[i].target);
  //     }
  //   }
  // }

  // const addRedBorder = (elementId: string) => {
  //   let el = document.getElementById(elementId);
  //   el?.classList.add("red-border");
  // }

  // // eslint-disable-next-line
  // const removeRedBorder = (elementId: string) => {
  //   let el = document.getElementById(elementId);
  //   el?.classList.remove("red-border");
  // }

  // const updateMemberObjFromFormInput = (_memberObj: Member | undefined, inTarget: string, inValue: string): void => {
  //   if (_memberObj) {
  //     const updatedMemObj = MemberService.newMemberObjWithFormInput(_memberObj, inTarget, inValue);
  //     switch (inTarget) {
  //       // data from these money elements elements will restructured before save
  //       case "money-date":
  //         updateRemitDate(new Date(inValue));
  //         break;
  //       case "money-dues-amount":
  //         updateRemitDues(inValue.substring(1));
  //         break;
  //       case "money-donation-amount":
  //         updateRemitDonation(inValue.substring(1));
  //         break;
  //     }
  //     if (updatedMemObj) {
  //       console.log(`setting memberObj to updatedMemObj after changes on form input`)
  //       localStorage.clear()
  //       MemberService.persistMemberObjToLocalStorage(memberObj);
  //       setMemberObj(updatedMemObj);
  //     }
  //   }
  // }
  // // console.log(`life member? ${MemberService.isLifeMember(getCurrentMemberObj())}`)



  // const formVolunteerGroupComponent = MemberFormVolGroup(handleFieldChange, handleCheckboxClick, onRenderCallback);

  // const trackFieldChangesBetweenSaves = (field: string) => inputsChanged.current.add(field);
  // const clearFieldChangesWithSaves = () => inputsChanged.current.clear();
  // const getFieldChanges = () => inputsChanged.current;

  function handleFieldChange(e: any) { }
  //   console.log(
  //     `member-form--handleFieldChange: target: ${e.target.id}, value: ${e.target.value}`);
  //   updateMemberObjFromFormInput(getCurrentMemberObj(), e.target.id, e.target.value);
  //   if (!["money-date", "money-donation", "money-amount"].includes(e.target.id)) {
  //     trackFieldChangesBetweenSaves(e.target.id);
  //   }
  // }
  // function handleCheckboxClick(e: any) {
  //   console.log(`member-form--handleCheckboxClick: target: ${e.target.id}, value: ${e.target.checked}`);
  //   updateMemberObjFromFormInput(getCurrentMemberObj(), e.target.id, e.target.checked);
  // }

  // const areThereFormProblems = (_memberObj: Member | undefined): boolean => {
  //   if (_memberObj) {
  //     let foundErr = false;
  //     let errArr = new Array<FormError>();
  //     if (!firstNameError() && _memberObj?.firstName === "") {
  //       const firstNameErrorMsg = `First name cannot be empty`;
  //       errArr.push({ target: "first-name", message: `${firstNameErrorMsg}`, level: "error" });
  //       foundErr = true;
  //     }
  //     if (!lastNameError() && _memberObj?.lastName === "") {
  //       const lastNameErrorMsg = `Last name cannot be empty`;
  //       errArr.push({ target: "last-name", message: `${lastNameErrorMsg}`, level: "error" });
  //       foundErr = true;
  //     }
  //     if (!remitError() &&
  //       (getRemitDues() !== "" || getRemitDonation() !== "")
  //       && getRemitDate() === undefined) {
  //       const remitErrorMsg = `Remittance date must contain a value`;

  //       errArr.push({ target: "money-date", message: `${remitErrorMsg}`, level: "error" });
  //       foundErr = true;
  //     }
  //     if (!remitWarn() &&
  //       getRemitDate() !== undefined
  //       && getRemitDues() === "" && getRemitDonation() === "") {
  //       const remitWarnMsg = `Please provide remittance value(s)`
  //       errArr.push({ target: "money-donation", message: `${remitWarnMsg}`, level: "warn" });
  //       foundErr = true;
  //     }
  //     if (foundErr) {
  //       setFormErrors([...getFormErrors(), ...errArr]);
  //     }
  //     return foundErr;
  //   }
  //   return false;
  // }

  function handleFormSave(a: string): any { }
  //   console.log(`Saving changes for ${memberId === "" ? "NEW MEMBER" : memberId}`)

  //   if (areThereFormProblems(getCurrentMemberObj())) {
  //     console.log(getFormErrorsForDisplay());
  //     // console.log(hasErrors);
  //     return { status: 500, error: `form problems` };
  //   }

  //   // const currentMemberData = getCurrentMemberObj()?.toIMember();
  //   // the new member memberData object is not ready for commit -- prepareMemberObjBeforeSave adapts inputs
  //   const memberObjToSave = prepareMemberObjBeforeSave(getCurrentMemberObj(), getFieldChanges());

  //   if (memberObjToSave) {
  //     const iMemberToSave: IMember | any = memberObjToSave?.toIMember();
  //     Save(getServerUrl(), iMemberToSave, memberId)
  //       .then((savRes) => {
  //         savRes && console.log(`member-form--handlesave status -- ${savRes.status}, errors: ${savRes?.body?.error}`)
  //         if ([200, 201, 204].includes(savRes.status)) {
  //           clearFieldChangesWithSaves();
  //           console.log("successful save")
  //           setAppState((oldState: AppState) => ({ ...oldState, viewState: MemberViewStates.list }));
  //         } else {
  //           let errArr = new Array<FormError>();
  //           errArr.push({ target: "any", message: savRes?.body?.error, level: "error" }); // TODO -- process this array
  //           setFormErrors([...getFormErrors(), ...errArr]);
  //         }
  //       }).catch((fault) => {
  //         throw new Error(`fault occured in Save: ${JSON.stringify(fault)}`);
  //       });
  //   } else {
  //     throw new Error(`cannot save an undefined IMember to DB`);
  //   }
  // }

  // const getFormErrorsForDisplay = () => {
  //   if (getFormErrors() && getFormErrors().length && getFormErrors().length > 0) {
  //     return getFormErrors().map((fe: FormError) => `${fe.message}`).join("<br>");
  //   } else {
  //     return Array<string>();
  //   }

  // }

  // function prepareMemberObjBeforeSave(_memberObj: Member | undefined, _updatedFields: Set<string>): Member | undefined {
  //   if (_memberObj) {
  //     let resMemObj = _memberObj.deepClone();

  //     if (resMemObj) {
  //       const validatedAddress: IAddress | undefined = MemberService.getUspsValidAddress(resMemObj);
  //       if (validatedAddress && resMemObj && !MemberService.areAddressesSame(resMemObj, validatedAddress)) {  // TODO FUTURE finish areAddressesSame
  //         resMemObj.address = validatedAddress.address;
  //         resMemObj.unit = validatedAddress.unit;
  //         resMemObj.city = validatedAddress.city;
  //         resMemObj.state = validatedAddress.state;
  //         resMemObj.postalCode = validatedAddress.postalCode;
  //         MemberService.addNote(resMemObj, `updated mailing address per USPS validation check`);
  //       }
  //       const remitArr = MemberService.getNewRemittances(getRemitDate(), getRemitDues(), getRemitDonation());
  //       if (remitArr.length > 0) {
  //         if (resMemObj.remittances === undefined || resMemObj.remittances.length === 0) {
  //           resMemObj.remittances = Array<Remittance>();
  //         }
  //         for (let i = 0; i < remitArr.length; i++) {
  //           resMemObj.remittances.push(remitArr[i]);
  //           MemberService.addNote(resMemObj, `added ${remitArr[i].memo} remittance`)
  //         }
  //       }
  //       const newPaidThroughDate: Date | undefined = MemberService.getNewPaidThroughDate(resMemObj);
  //       const joinedOrRenewdDate: Date | undefined = MemberService.getNewJoinedRenewDate(resMemObj);

  //       const newJoined: Date | undefined = appState.viewState === MemberViewStates.new ? joinedOrRenewdDate : undefined;
  //       if (newJoined !== undefined && appState.viewState === MemberViewStates.new) {
  //         resMemObj.joined = newJoined;
  //       }

  //       const renewalDt: Date | undefined = appState.viewState === MemberViewStates.renew ? joinedOrRenewdDate : undefined;

  //       const anMmb: string | undefined = MemberService.getNewMmb(resMemObj);
  //       const newMmb: string | undefined = anMmb !== undefined ? anMmb : (appState.viewState !== undefined && appState.viewState === MemberViewStates.new ? "VOL" : undefined);

  //       if (newMmb !== undefined) {
  //         resMemObj.mmb = newMmb;

  //         if (!["LM", "HLM"].includes(newMmb) && newPaidThroughDate !== undefined) {
  //           resMemObj.paidThrough = newPaidThroughDate;
  //           MemberService.addNote(resMemObj, `set paidThrough  ${newPaidThroughDate.toISOString().substring(0, 11)}`)
  //         }
  //       }

  //       if (newJoined !== undefined) {
  //         if (resMemObj.id === undefined) {
  //           resMemObj.id = nanoid();
  //         }
  //         MemberService.addNote(resMemObj, `joined as new ${newMmb} member on ${newJoined.toISOString().substring(0, 10)}`);
  //       }

  //       if (renewalDt !== undefined) {
  //         MemberService.addNote(resMemObj, `renewed as ${newMmb} member on ${renewalDt.toISOString().substring(0, 10)}`);
  //       }
  //       if (_updatedFields.size > 0) {
  //         let fldArr = Array<string>();
  //         _updatedFields.forEach((k, v, s) => fldArr.push(v));
  //         MemberService.addNote(resMemObj, `changed the following field(s): ${fldArr.join()}`);
  //       }
  //       return resMemObj;
  //     }
  //     return undefined;
  //   } else { return undefined; }
  // }

  console.log(`building JSX \n data fetch status ${JSON.stringify(data)}`)

  if ((data) || mode === MemberViewStates.new) {
    const formBaseGroupComponent = MemberFormBaseGroup({
      onRenderCallback,
      memberObj,
      setMemberObj,
      handleFieldChange,
      firstNameError: firstNameError(),
      lastNameError: lastNameError(),
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
