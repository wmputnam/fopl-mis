/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
import Modal from 'react-modal';

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
import { MemberService } from './services/MemberService';
import { ModalFM } from './@components/ModalFM';
import { PostMailStatusDropdown } from './@components/PostMailStatusDropdown';
import { EmailStatusDropdown } from './@components/EmailStatusDropdown';
import { VolunteerRoleMultiselect } from './@components/VolunteerRoleMultiselect';
import { StateDropdown } from './@components/StateDropdown';

export interface AppState {
  memberId: string;
  viewState: MemberViewStates;
  fromViewState: MemberViewStates[];
  modalIsOpen: boolean;
  modalMessage: string;
  modalAction: () => any;
  modalRoot: () => any;
  listViewFilter?: string;
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

function noOp() { };

export const getInitialViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.list,
    fromViewState: [],
    modalIsOpen: false,
    modalMessage: "",
    modalAction: () => { },
    modalRoot: () => document.body,
  });

export const getTestViewState = (): AppState => (
  {
    memberId: "",
    viewState: MemberViewStates.test,
    fromViewState: [],
    modalIsOpen: false,
    modalMessage: "",
    modalAction: () => { },
    modalRoot: () => document.body,
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
  const getListFilter = () => appState.listViewFilter ? appState.listViewFilter : "";
  const updateListFilter = (filter?: string) => {
    if (filter) {
      setAppState((oldState: any) => ({
        ...oldState,
        listViewFilter: filter
      }));
    } else {
      setAppState((oldState: any) => ({
        ...oldState,
        listViewFilter: ""
      }));
    }
  }
  const componentDidMount = () => {
    console.log("mounted")
  }

  React.useEffect(() => {
    console.log(`feapp: is mounted\n    ${JSON.stringify(appState)}`);
    return (() => console.log(`feapp2: will unmount\n    ${JSON.stringify(appState)}`))
  },
    [appState])

  const [appMessages, setAppMessages] = React.useState<string[]>(["Hello!"]);

  Modal.setAppElement(document.getElementById('root') as HTMLElement);

  let component: any;
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
        <h1 id="lost">Are we lost?<br />Welcome to the playground</h1 >
        <PostMailStatusDropdown />
        <br />
        <EmailStatusDropdown />
        <br />
        <VolunteerRoleMultiselect />
        <br />
        < StateDropdown />
        <br />
        <CancelBtn
          setAppState={setAppState}
          getAppState={getAppState}
        />
      </>
      break;
  }

  const openModal = () => {
    setAppState((oldState: AppState) => ({
      ...oldState,
      modalIsOpen: true
    }));
  };

  const openPlayground = () => {
    setAppState((oldState: AppState) => ({
      ...oldState,
      viewState: MemberViewStates.refresh
    }));

  }


  return (
    <div className="App" data-testid="App">
      <header>
        <AppHeader
          messages={appMessages}
          showListSearch={appState.viewState === MemberViewStates.list}
          updateListFilter={updateListFilter}
          getListFilter={getListFilter} />
      </header>
      <main>
        <ModalFM
          setAppState={setAppState}
          getAppState={getAppState}
          actionMessage={appState.modalMessage}
          actionHandler={appState.modalAction}
        />
        {component}
      </main>
      <footer>
        <button
          className='playground basic-button'
          onClick={openPlayground}>
          Playground</button>
      </footer>
    </div>
  );
}

/*  PARKING LOT */
// eslint-disable-net-line @typescript-eslint/no-unused-vars
/* */