import React from "react";
import SearchBar from "./SearchBar";
import "./RightColumn.css";

const RightColumn = () => {
    return (
        <div className="right-column">
            <div className="right-column-content">
                <SearchBar />
            </div>
        </div>
    );
};

export default RightColumn;