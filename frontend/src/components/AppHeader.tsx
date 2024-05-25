import React from "react";
// import { ListSearch } from "./ListSearch";
import { NewMemberReport } from "./NewMemberReport";
import { UserInfo } from "./UserInfo";
import { IUserInfo } from "src/interfaces";
// import { IUserInfo } from "src/interfaces";

export interface AppHeaderProps {
  messages: string[];
  userInfo: IUserInfo | undefined;
  updateLogin: () => void;
  // showListSearch: boolean;
  // updateListFilter: (v?: string) => void;
  // getListFilter: () => string;
}

export const AppHeader = ({ messages, userInfo, updateLogin /*, showListSearch, getListFilter, updateListFilter */ }: AppHeaderProps) => {

  let messageElements;
  if (messages) {
    messageElements = messages.map((m, index) => {
      return (
        <li key={index}>{m}</li>
      )
    });
  }

  console.log(`AppHeader: returning JSX`)
  return (
    <>
      <div className="app-header" data-testid="app-header" role="menubar">
        <div className="app-header--left" data-testid="app-header--left">
          <div className="org-name" data-testid="org-name">
            <span className="">Friends of the Petaluma Library</span>
          </div>
          <div className="app-name" data-testid="app-name">
            <span className="">Membership</span>
          </div>
        </div>
        <div className="app-header--middle" data-testid="app-header--middle">
          <div className={
            "app-header--messages" + (messages.length === 0 ? " HIDE" : " red-text")} >
            {messageElements && messageElements.length > 0 &&
              <ul className="no-bullet" data-testid="no-bullet">
                {messageElements}
              </ul>}
          </div>

        </div>
        <div className="app-header--right" data-testid="app-header--right">
          <div className="app-header--right-container" data-testid="app-header--right-container" />
          {/* { false && showListSearch && <ListSearch */}
          {/* getSearchFilter={getListFilter()} */}
          {/* updateSearchFilter={updateListFilter} />} */}
          <UserInfo
            userInfo={userInfo}
            updateLogin={updateLogin}
          />
          {userInfo?.status && <NewMemberReport /> /* TODO make this a reports downdown menu*/}
        </div>
      </div>

    </>
  );
}

const appHeader = AppHeader;
export default appHeader;