import React, { useState } from "react";
import "./LeftColumn.css";
import PostModal from "./PostModal";

const LeftColumn = ({ buttons }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const handlePostClick = () => {
        setIsPostModalOpen(true);
    };

    return (
        <div className="left-column">
            <ul>
            {buttons.map((button) => (
                <li>
                <button
                    key={button}
                    className={`left-column-button ${
                        button === "Post" && "left-column-button-post"
                    }`}
                    onClick={button === "Post" ? handlePostClick : undefined}
                >
                    {button}
                </button>
                </li>
            ))}
            </ul>
            {isPostModalOpen && <PostModal onClose={() => setIsPostModalOpen(false)} />}
        </div>
    );
};

export default LeftColumn;