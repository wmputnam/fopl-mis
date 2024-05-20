import React from "react";
import { type MemberListFooterProps } from "../interfaces";
import { setPageNumber } from "src/services";

export const MemberListFooter = ({ pageState, updatePageState }: MemberListFooterProps) => {

    const handleStartClick = () => {
        setPageNumber(1,pageState,updatePageState);
    };
    const handleBackClick = () => {
        setPageNumber(pageState.pageNumber - 1,pageState,updatePageState);
    };
    const handleNextClick = () => {
        setPageNumber(pageState.pageNumber + 1, pageState, updatePageState);
    };
    const handleEndClick = () => {
        setPageNumber(pageState.numberOfFilteredPages,pageState,updatePageState);
    };

    return (
        <>
            <div
                className="list-footer">
                <div className="list-footer-left-spacer"></div>

                {pageState.pageNumber > 1 && <div
                    className="list-footer-start-btn">
                    <button
                        className="basic-button"
                        id="list-footer-start"
                        onClick={handleStartClick}>START</button>
                    <div
                        className="list-footer-row-spacer" />
                </div>}

                {pageState.pageNumber > 1 && <div
                    className="list-footer-back-btn">
                    <button
                        className="basic-button"
                        id="list-footer-next"
                        onClick={handleBackClick}>BACK</button>
                    <div
                        className="list-footer-row-spacer" />
                </div>}
                {pageState.pageNumber === 1 && <><div
                    className="list-footer-row-spacer" />
                    <div
                        className="list-footer-row-spacer" />
                    <div
                        className="list-footer-row-spacer" />
                    <div
                        className="list-footer-row-spacer" />
                </>}
                <>
                    <div
                        className="list-footer-page-info">
                        <span>Page {pageState.pageNumber} of {pageState.numberOfFilteredPages}</span></div>
                    <div
                        className="list-footer-row-spacer" />
                </>
                {pageState.pageNumber < pageState.numberOfFilteredPages && <div
                    className="list-footer-next-btn">
                    <button
                        className="basic-button"
                        id="list-footer-next"
                        onClick={handleNextClick}>NEXT</button>

                    <div
                        className="list-footer-row-spacer" />
                </div>}
                {pageState.pageNumber < pageState.numberOfFilteredPages && <div
                    className="list-footer-end-btn">
                    <button
                        className="basic-button"
                        id="list-footer-end"
                        onClick={handleEndClick}>END</button>
                    <div
                        className="list-footer-row-spacer" />
                </div>}
            </div>
        </>
    );
}

export default MemberListFooter;