/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';

import './App.css';

import DropMember from './@components/DropMember';
import EditMember from './@components/EditMember';
import CancelBtn from "./@components/CancelBtn"
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
  memberId: string;
  viewState: MemberViewStates;
  fromViewState: MemberViewStates[];
}

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

export const getInitialViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.list,
    fromViewState: []
  });

export const getTestViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.test,
    fromViewState: []
  });

// ***
interface AppProps {
  testMode?: boolean;
}
export default function App({ testMode }: AppProps): JSX.Element {
  let initialAppState: () => AppState;
  if (testMode && testMode === true) {
    console.log(` testMode : ${testMode}`);
    initialAppState = getTestViewState
  } else {
    initialAppState = getInitialViewState;
  }
  const [appState, setAppState] = React.useState<AppState>(initialAppState);
  const getAppState = () => appState;

  const componentDidMount = () => {
    console.log("mounted")
  }

  React.useEffect(() => {
    console.log(`feapp: is mounted\n    ${JSON.stringify(appState)}`);
    return (() => console.log(`feapp2: will unmount\n    ${JSON.stringify(appState)}`))
  },
    [appState])

  const [appMessages, setAppMessages] = React.useState<string[]>(["Hello!"]);

  let component
  console.log(appState.viewState);
  switch (appState.viewState) {
    case MemberViewStates.list:
      console.log("in the list entry -- expected in normal mode")
      MemberService.clearMemberId();
      component = <Profiler id="App-list" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
        <MemberList
          setAppState={setAppState}
          getAppState={getAppState}
        /></Profiler>
      break;
    case MemberViewStates.edit:
      component = <EditMember
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
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    case MemberViewStates.money:
      component = <MemberFormMoney
        setAppState={setAppState}
        getAppState={getAppState}
      />
      break;
    default:
      console.log("in the lost entry -- expected in test mode")
      component = <>
        <h1 id="lost"> opps we are now lost</h1>
        <CancelBtn
          setAppState={setAppState}
          getAppState={getAppState}
        />
      </>
      break;
  }

  return (
    <div className="App" data-testid="App">
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