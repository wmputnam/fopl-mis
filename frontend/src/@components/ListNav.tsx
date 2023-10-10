import React from "react";

export interface ListNavProps {
  pageNumber: number;
  pageSize: number;
  totalSize: number;
  gotoPage: (x: number) => void;
}
const ListNav = ({ pageNumber, pageSize, totalSize, gotoPage }: ListNavProps) => {
  const lastPage = Math.ceil(totalSize / pageSize);
  function handleNext() {
    gotoPage(pageNumber + 1)
  }
  function handlePrior() {
    gotoPage(pageNumber - 1)
  }
  return (
    <>
      <nav
        className="list-nav-container"
        data-testid="list-nav-container"
        role="navigation"
        aria-label={`page ${pageNumber} of ${lastPage} showing ${pageSize} of ${totalSize} total rows`}>
        {pageNumber > 0 &&
          <button
            id="next"
            onClick={handleNext}>Next page</button>}
        {pageNumber < lastPage &&
          <button
            id="next"
            onClick={handlePrior}>Prior page</button>}

      </nav>

    </>
  );
}

export default ListNav;