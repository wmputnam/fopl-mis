/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { AllMemberProps, ViewStateProps } from "../@interfaces/MemberProps";
import Home from "./CancelBtn";
import loadData from "./DataLoader";
import { CurrentMemberContext, ServerContext } from "../App";
import { flatten, unflatten } from "flat";
import NotesListRow from "./NotesListRow";
import { Notes } from "packages/Notes";
import NotesListHeader from "./NotesListHeader";
import CancelBtn from "./CancelBtn";
import BackToMemberBtn from "./BackToMemberBtn";


const MemberFormNotes = ({ updateViewState }: ViewStateProps): JSX.Element => {
  const { serverURL } = React.useContext(ServerContext);
  const serverUrl = serverURL === undefined ? "http://localhost:3030" : serverURL;
  const memberId = React.useContext(CurrentMemberContext);
  // const memberID = memberId === undefined ? "" : memberId;

  function isEmptyObject(obj: Object) {
    for (let i in obj) return false;
    return true;
  }
  const dataInitial: any = React.useRef({});

  React.useEffect(() => {
    // memberData && console.log(`fe-member-form: memberData ${JSON.stringify(memberData)}`)
    if (isEmptyObject(dataInitial.current)) {
      loadData(serverUrl, memberId, "")
        .then((loadRes: any) => {
          if ([200, 201].includes(loadRes.status)) {
            console.log("successful load")
            dataInitial.current = loadRes.body;
            setMemberData(dataInitial.current)
          }
        })
        .catch((fault) => {
          return { status: 500, error: `fault occured: ${JSON.stringify(fault)}` };
        });
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
  const [memberData, setMemberData] = React.useState(dataInitial.current as AllMemberProps);

  const notesArr: Notes[] = memberData.notes ? memberData.notes as Notes[] : [];

  let notesElements;

  notesElements = notesArr.map((m) => {
    return (
      <>
        <NotesListRow
          key={m?.date.toString()}
          date={m?.date !== undefined ? new Date(m.date) : new Date()}
          note={m.note}
        />
      </>
    )
  });

  if (notesArr) {
    return (
      <>
        <BackToMemberBtn updateViewState={updateViewState} />
        <Home updateViewState={updateViewState} />
        <CancelBtn updateViewState={updateViewState} updateAppMessages={() => { }} />
        {/* {!!data && <MemberListHeader />} */}
        <h3>Notes for {memberData.firstName + " " + memberData.lastName}</h3>
        {!!notesArr && <NotesListHeader />}
        {!!notesArr && notesElements}
      </>
    );
  } else {
    return (
      <p>No members to display</p>
    );
  }
}

export default MemberFormNotes;