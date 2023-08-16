/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';

import './App.css';

import DropMember from './@components/DropMember';
import EditMember from './@components/EditMember';
import Home from "./@components/CancelBtn"
import MemberList from './@components/MemberList';
import NewMember from './@components/NewMember';
import RenewMember from './@components/RenewMember';
import { MemberViewStates } from './@interfaces/enums';
import AppHeader from './@components/AppHeader';
import MemberFormNotes from './@components/MemberFormNotes';
import MemberFormMoney from './@components/MemberFormMoney';
import { IMember } from 'packages/member-shared';
import { FormError } from "./@components/MemberFormBase"
import { MemberService } from './services/MemberService';

export interface AppState {
  viewState: MemberViewStates;
}
const getInitialViewState = (): AppState => (
  { viewState: MemberViewStates.list });

export interface RenderCallBackI {
  id?: string;
  phase?: "mount" | "update" | "nested-update";
  actualDuration?: number;
  baseDuration?: number;
  startTime?: number;
  endTime?: number;
}
export const onRenderCallback = (
  { id, phase }: Partial<RenderCallBackI>
): void => {
  id && phase && console.log(`${id} ${phase}`)
}

export const isEmptyObject = (obj: Object) => {
  for (let i in obj) return false;
  return true;
}



// ***

export default function App() {

  const [appState, setAppState] = React.useState<AppState>(getInitialViewState);
  const getAppState = () => appState;

  React.useEffect(() => {
    console.log(`feapp: is mounted\n    ${JSON.stringify(appState)}`);
    return (() => console.log(`feapp2: will unmount\n    ${JSON.stringify(appState)}`))
  },
    [appState])

  const [appMessages, setAppMessages] = React.useState<string[]>(["Hello!"]);

  let component
  switch (appState.viewState) {
    case MemberViewStates.list:
      MemberService.clearMemberId();
      component = <Profiler id="App-list" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
        <MemberList
          setAppState={setAppState}
          getAppState={getAppState}
        /></Profiler>
      break;
    case MemberViewStates.edit:
      component = <EditMember
        memberId={MemberService.retrieveMemberId(true)}
        mode={MemberViewStates.edit}
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.new:
      component = <NewMember
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.drop:
      component = <DropMember
        memberId={MemberService.retrieveMemberId(true)}
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.renew:
      component = <RenewMember
        memberId={MemberService.retrieveMemberId(true)}
        mode={MemberViewStates.renew}
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.notes:
      component = <MemberFormNotes
        memberId={MemberService.retrieveMemberId(true)}
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.money:
      component = <MemberFormMoney
        memberId={MemberService.retrieveMemberId(true)}
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    default:
      component = <>
        <h1> opps we are now lost</h1>
        <Home
          setAppState={setAppState}
          getAppState={getAppState}
        />
      </>
      break;
  }

  return (
    <div className="App">
      <header>
        <AppHeader messages={appMessages} />
      </header>
      <main>
        {component}
      </main>
      <footer></footer>
    </div>
  );
}
/*  PARKING LOT */
// eslint-disable-net-line @typescript-eslint/no-unused-vars
/* */