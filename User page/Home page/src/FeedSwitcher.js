import React, { useState } from "react";
import "./FeedSwitcher.css";

const FeedSwitcher = ({ onSwitch, active }) => {
    const [activeTab, setActiveTab] = useState(active);

    const handleClick = (tab) => {
        setActiveTab(tab);
        onSwitch(tab);
    };

    return (
        <div className="feed-switcher">
            <button
                className={activeTab === "For You" ? "active" : ""}
                onClick={() => handleClick("For You")}
            >
                For You
            </button>
            <button
                className={activeTab === "Following" ? "active" : ""}
                onClick={() => handleClick("Following")}
            >
                Following
            </button>
        </div>
    );
};

export default FeedSwitcher;