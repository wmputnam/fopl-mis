import React from "react";


const NotesListHeader = (): any => {
    return (
        <div className="notes-row--header header" data-testid="notes-row--header">
            <div className="notes-row--date" data-testid="notes-row--date">Date</div>
            <div className="notes-row--note" data-testid="notes-row--note">Note</div>
        </div>
    );
}

export default NotesListHeader;