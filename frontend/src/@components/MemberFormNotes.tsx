/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from "react"
import NotesListRow from "./NotesListRow";
import { Notes } from "packages/Notes";
import NotesListHeader from "./NotesListHeader";
import CancelBtn from "./CancelBtn";
import { getServerUrl } from "../services/AppConfig";
import { AppState, onRenderCallback } from "../App";
import { IMember } from "packages/member-shared";
import useAxios from "axios-hooks";

export interface MemberFormNotesProps {
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;
}

const MemberFormNotes = ({getAppState, setAppState }: MemberFormNotesProps): JSX.Element => {

  const memberId = getAppState().memberId;
  const LoadFromDb = (memberId: string): Array<any> => {
    return useAxios<IMember>(
      { baseURL: getServerUrl(), url: `/members/${memberId}` }, { manual: false, useCache: false }
    );
  }
  let someData: Array<any> | undefined;
  if (memberId) {
    someData = LoadFromDb(memberId);
  } else {
    someData = undefined;
  }

  const memberData = someData && someData?.[0] && someData[0]?.data ? someData[0].data : undefined;

  const notesArr: Notes[] | undefined = memberData && memberData.notes ? memberData.notes as Notes[] : undefined;

  let notesElements;

  if (notesArr) {
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

    return (
      <>
        <CancelBtn
          getAppState={getAppState}
          setAppState={setAppState}
        />
        {/* {!!data && <MemberListHeader />} */}
        <h3>Notes for {memberData.firstName + " " + memberData.lastName}</h3>
        <Profiler id="memberNotes" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          {!!notesArr && <NotesListHeader />}
          {!!notesArr && notesElements}
        </Profiler>
      </>
    );
  } else {
    return (
      <p>No member data to display</p>
    );
  }
}

export default MemberFormNotes;