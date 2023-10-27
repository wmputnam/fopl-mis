import React from "react";

export interface ListSearchProps {
  updateSearchFilter: (v?: any) => void;
  getSearchFilter: () => string
}

const ListSearch = ({ getSearchFilter, updateSearchFilter }: ListSearchProps) => {
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
    if (searchVisible && searchFilterText !== getSearchFilter()) {
      updateSearchFilter(searchFilterText);
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

export default ListSearch;

/*
  function handleAddressChange(e: any) {
    if (memberObj && e.target.id === "address") {
      setMemberObj((oldObj) => (oldMemberStateToNew(oldObj, { _address: e.target.value } as Partial<Member>)));
    }
  }
*/