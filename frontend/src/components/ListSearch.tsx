import React from "react";
import { MemberListContainerState } from "../interfaces";
import { setListFilter } from "../services";

export interface ListSearchProps {
  updatePageState: (v?: any) => void;
  pageState: MemberListContainerState
}

export const ListSearch = ({ pageState, updatePageState }: ListSearchProps) => {
  const [searchVisible, setSearchVisible] = React.useState<boolean>(false);
  const [searchFilterText, setSearchFilterText] = React.useState<string>("");

  function toggleViewState() {
    setSearchVisible((oldState: boolean) => (!oldState));
  }

  function handleSearchUpdate(e: any) {
    if (e.target.id === "search-text") {
      if (e.target.value === "\r") {

      } else {
        setSearchFilterText(e.target.value);
      }
    }
  }

  function handleSearchClick(e: any) {
    e.preventDefault();
    if (searchVisible && searchFilterText !== pageState.listFilter.lastName) {
      console.log(`ListSearch.tsx: updating page state with listFilter ${searchFilterText}`)
      setListFilter({ lastName: searchFilterText }, pageState, updatePageState)
      // updatePageState((oldState: MemberListContainerState) => ({ ...oldState, listFilter: searchFilterText }));
      // toggleViewState();
    } else {
      toggleViewState();
    }
  }

  return (
    <>
      <div
        className="list-search-container"
        data-testid="list-search-container"
        role="search">
        <button
          className="list-search--search-btn basic-button"
          id="list-search"
          onClick={handleSearchClick}>
          {searchVisible ? "Search?" : "Search"}</button>
        {searchVisible && <input
          className="list-search--input"
          type="text"
          id="search-text"
          placeholder="Lastname"
          onChange={handleSearchUpdate} />}
      </div>
    </>
  );
}


/*
  function handleAddressChange(e: any) {
    if (memberObj && e.target.id === "address") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _address: e.target.value } as Partial<Member>)));
    }
  }
*/