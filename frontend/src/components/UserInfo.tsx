// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { IUserInfo } from 'src/interfaces';

export interface UserInfoProps {
  userInfo: IUserInfo;
}

export function UserInfo(props: any): JSX.Element {

  const btnClass = "user-info-btn " + (props.userInfo && props.userInfo.status ? "logout" : "login");
  const btnText = props.userInfo !== undefined ? props.userInfo.message : "... ...";

  console.log(`UserInfo returning JSX -- ${btnClass} / "${btnText}"`)
  return (
    <>
      <div
        className='user-info-container'>
        <button
          className={btnClass}
          onClick={props.updateLogin}
        >
          {btnText}
        </button>
      </div>
    </>);
}