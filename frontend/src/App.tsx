import React from 'react';

import './App.css';

import DropMember from './@components/DropMember';
import EditMember from './@components/EditMember';
import Home from "./@components/CancelBtn"
import MemberList from './@components/MemberList';
import NewMember from './@components/NewMember';
import RenewMember from './@components/RenewMember';
import { IServerContext } from './@interfaces/IServerContext';
import { MemberViewStates } from './@interfaces/enums';
import AppHeader from './@components/AppHeader';
import MemberFormNotes from './@components/MemberFormNotes';

export var CurrentMemberContext: React.Context<string>
export var ServerContext: React.Context<IServerContext>

export default function App() {

  const serverUrl: string = process.env?.REACT_APP_SERVER_URL || "http://localhost:3030";

  ServerContext = React.createContext(
    {
      serverURL: serverUrl
    } as unknown as IServerContext
  );
  const [appViewState, setAppViewState] = React.useState({ view: MemberViewStates.list })
  const [currentMember, setCurrentMember] = React.useState("")
  const [appMessages, setAppMessages] = React.useState<string[]>(["Hello!"]);
  CurrentMemberContext = React.createContext(currentMember)

  function setViewState(a: MemberViewStates): any {
    setAppViewState((oldAppState) => (
      {
        ...oldAppState,
        view: a || ""
      })
    );
  }
  function setCurrentMemberContext(a: string | undefined): any {
    setCurrentMember(a || "");
    CurrentMemberContext = React.createContext(a || "")
  }

  function setMessages(a: string[] = [""]): any {
    setAppMessages(a);
  }

  let component
  switch (appViewState.view) {
    case MemberViewStates.list:
      component = <MemberList
        updateViewState={setViewState}
        updateCurrentMember={setCurrentMemberContext}
        updateAppMessages={setMessages}
      />
      break;
    case MemberViewStates.edit:
      component = <EditMember
        updateViewState={setViewState}
        updateCurrentMember={setCurrentMemberContext}
        updateAppMessages={setMessages}
      />
      break;
    case MemberViewStates.new:
      component = <NewMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
      break;
    case MemberViewStates.drop:
      component = <DropMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
      break;
    case MemberViewStates.renew:
      component = <RenewMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
      break;
    case MemberViewStates.notes:
      component = <MemberFormNotes updateViewState={setViewState}  />
      break;
    default:
      component = <><h1> opps we are now lost</h1><Home updateViewState={setViewState} /></>
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
/*  PARKING LOT

      case "edit-address":
              component = <EditMemberAddress updateViewState={setViewState} />
              break;

          */
// export default App;
/*
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> }
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> }
      </header>

      */