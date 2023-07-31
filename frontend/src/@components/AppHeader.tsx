import React from "react";
import { AppMessages } from "../@interfaces/MemberProps";

const AppHeader = ({ messages }: AppMessages) => {
  return (
    <>
      <div className="app-header" role="menubar">
        <div className="app-header--left">
          <div className="org-name">
            <span className="">Friends of the Petaluma Library</span>
          </div>
          <div className="app-name">
            <span className="">Membership</span>
          </div>
        </div>
        <div className="app-header--middle">
          <div className={
            "app-header--messages" + (messages.length === 0 ? " HIDE" : "")} >{messages}</div>
        </div>
        <div className="app-header--right">
          <div className="app-header--right-container" />
        </div>
      </div>

    </>
  );
}

export default AppHeader;