import React from "react";
import { type MemberListFooterProps } from "../interfaces";

export const MemberListFooter = ({ getAppState, setAppState, updatePageState, pageState }: MemberListFooterProps) => {

    const handleStartClick = () => {
        updatePageState((oldState) => ({ ...oldState, pageNumber: 1 }))
    };
    const handleBackClick = () => {
        updatePageState((oldState) => ({ ...oldState, pageNumber: oldState.pageNumber - 1 }))
    };
    const handleNextClick = () => {
        updatePageState((oldState) => ({ ...oldState, pageNumber: oldState.pageNumber + 1 }))
    };
    const handleEndClick = () => {
        updatePageState((oldState) => ({ ...oldState, pageNumber: oldState.numberOfFilteredPages }))
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