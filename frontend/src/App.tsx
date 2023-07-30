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

export var CurrentMemberContext: React.Context<string>
export var ServerContext: React.Context<IServerContext>

export default function App() {

  console.log(`server url in environment is ${process.env.REACT_APP_SERVER_URL}`);
  const serverUrl: string = process.env?.REACT_APP_SERVER_URL || "http://localhost:3030";
  console.log(`server url in use is ${process.env.REACT_APP_SERVER_URL}`);
  ServerContext = React.createContext(
    {
      serverURL: serverUrl
    } as unknown as IServerContext
  );
  const [appState, setAppState] = React.useState({ view: MemberViewStates.list })
  const [currentMember, setCurrentMember] = React.useState("")
  CurrentMemberContext = React.createContext(currentMember)

  function setViewState(a: MemberViewStates): any {
    setAppState((oldAppState) => (
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

  let component
  switch (appState.view) {
    case MemberViewStates.list:
      component = <MemberList updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
      break;
    case MemberViewStates.edit:
      component = <EditMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
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
    default:
      component = <><h1> opps we are now lost</h1><Home updateViewState={setViewState} /></>
      break;
  }

  return (
    <div className="App">
      <header>
        <h1>Membership</h1>
        <h3>Friends of the Petaluma Library</h3>
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