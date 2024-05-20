/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Profiler } from 'react';
import Modal from 'react-modal';

import './assets/App.css';

import {
  DropMember,
  EditMember,
  CancelBtn,
  NewMember,
  RenewMember,
  AppHeader,
  MemberFormNotes,
  MemberFormMoney,
  MemberListContainer,
  ModalFM,
  PostMailStatusDropdown,
  EmailStatusDropdown,
  VolunteerRoleMultiselect,
  StateDropdown
} from "./components";
import {
  MemberService,
  getInitialViewState,
  getTestViewState,
  setListFilter,
  clearListFilter,
  setMemberId,
  clearMemberId,
  setView,
  pushView,
  popView,
} from "./services";
import { AppState, MemberViewStates, onRenderCallback } from "./interfaces";
// import MemberListContainer from './components/MemberListContainer';

function noOp() { };


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
  // const getListFilter = () => appState.listViewFilter ? appState.listViewFilter : "";
  // const updateListFilter = (filter?: string) => {
  //   if (filter) {
  //     setListFilter(appState, filter, setAppState);
  //   } else {
  //     clearListFilter(appState, setAppState);
  //   }
  // }
  const componentDidMount = () => {
    console.log("mounted")
  }

  React.useEffect(() => {
    console.log(`feapp: is mounted\n    ${JSON.stringify(appState)}`);
    return (() => console.log(`feapp2: will unmount\n    ${JSON.stringify(appState)}`))
  },
    [appState]);

  const [appMessages, setAppMessages] = React.useState<string[]>(["Hello!"]);

  Modal.setAppElement(document.getElementById('root') as HTMLElement);

  let component: any;
  console.log(`App.tsx: current view state is "${appState.viewStateStack[0]}"`);
  // console.log(`App.tsx: list filter is "${appState.listViewFilter}"`);
  switch (appState.viewStateStack[0]) {
    case MemberViewStates.list:
      console.log("in the list entry -- expected in normal mode")
      MemberService.clearMemberId();
      component =
        <Profiler id="App-list" onRender={onRenderCallback as React.ProfilerOnRenderCallback}>
          <MemberListContainer
            setAppState={setAppState}
            getAppState={getAppState}
            // getListFilter={getListFilter}
          />
        </Profiler>
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
        <br />
        <div
          className='volunteer-roles--container'>

          <label
            htmlFor="volunteer-roles">Volunteer roles</label>
          <VolunteerRoleMultiselect
            className="volunteer-roles"
            id="volunteer-roles"
            handleChange={(e: any) => { console.log(`app got back: ${JSON.stringify(e)}`) }}
            defaultValue={["book-store", "other--nonsense"]}
            isDisabled={true}
          />
        </div>
        <br />
        <CancelBtn
          setAppState={setAppState}
          getAppState={getAppState}
        />
      </>
      break;
  }


  const openPlayground = () => {
    pushView(appState, MemberViewStates.refresh, setAppState);
  }


  return (
    <div className="App" data-testid="App">
      <header>
        <AppHeader
          messages={appMessages}
          // showListSearch={appState.viewStateStack[0] === MemberViewStates.list}
          // updateListFilter={updateListFilter}
          // getListFilter={getListFilter} 
          />
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