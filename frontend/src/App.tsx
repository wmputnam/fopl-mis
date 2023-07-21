import React from 'react';

import './App.css';

import DropMember from './@components/DropMember';
import EditMember from './@components/EditMember';
// import EditMemberAddress from './components/EditMemberAddress';
import Home from "./@components/Home"
import MemberList from './@components/MemberList';
import NewMember from './@components/NewMember';
// import RenewMember from './components/RenewMember';

export var CurrentMemberContext:React.Context<string>
export default function App() {

  const [appState,setAppState] = React.useState({view:"list"})
  const [currentMember,setCurrentMember] = React.useState("")
  CurrentMemberContext = React.createContext(currentMember)

  function setViewState(a:string|undefined):any  {
    setAppState ( (oldAppState) => (
      {
      ...oldAppState,
      view:a||""
      })
    );
  }
  function setCurrentMemberContext(a:string|undefined):any  {
    setCurrentMember ( a||"" );
    CurrentMemberContext = React.createContext(a||"")
  }
  
  // console.log(appState);

  // React.useEffect( () => { console.log(appState);} ,[appState])
  // return(<>William</>);
  let component
  switch(appState.view) {
      case "list":
        component = <MemberList updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext}/>
        break;
      case "edit":
        component = <EditMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext}/>
        break;
      case "new":
            component = <NewMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext}/>
            break;
      case "drop":
                component = <DropMember updateViewState={setViewState} updateCurrentMember={setCurrentMemberContext} />
                break;
      default:
        component = <><h1> opps we are now lost</h1><Home updateViewState={setViewState}/></>
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

      case "renew":
          component = <RenewMember updateViewState={setViewState} />
          break;
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