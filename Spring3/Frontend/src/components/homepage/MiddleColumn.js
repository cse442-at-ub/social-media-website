import React, { useState } from "react";
import FeedSwitcher from "./FeedSwitcher";
import Feed from "./Feed";
import "./MiddleColumn.css";

const MiddleColumn = () => {
    const [feedType, setFeedType] = useState("For You");

    return (
        <div className="middle-column">
            <FeedSwitcher onSwitch={setFeedType} />
            <div className="scrollable-area">
                <Feed type={feedType} />
            </div>
        </div>
    );
};

export default MiddleColumn;