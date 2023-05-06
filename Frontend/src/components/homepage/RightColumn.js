import React from "react";
import SearchBar from "./SearchBar";
import "./RightColumn.css";

const RightColumn = () => {
    const imageUrl = `${process.env.PUBLIC_URL}/logo1.jpg`;
    return (
        <div className="right-column">
            <div className="right-column-content">
                <img src={imageUrl}/>
            </div>
        </div>
    );
};

export default RightColumn;