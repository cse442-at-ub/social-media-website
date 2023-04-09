import React, { useState } from "react";
import "./LeftColumn.css";
import PostModal from "./PostModal";
import { useNavigate } from "react-router-dom";
import withAuth from '../../auth.js';

const LeftColumn = ({ isLoggedIn, userFullName, userEmail, userAge }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const leftButtons = isLoggedIn
        ? ["Home", "Profile", "Post"]
        : ["Home", "Profile", "Post", "Login"];
    const handleProfileClick = () => {
        navigate("/userpage");
    };
    const handlePostClick = () => {
        setIsPostModalOpen(true);
    };
    const navigate = useNavigate();

    return (
        <div className="left-column">
            <ul>
                {leftButtons.map((button) => (
                    <li>
                        <button
                            key={button}
                            className={`left-column-button ${
                                button === "Post" && "left-column-button-post"
                            }`}
                            onClick={
                                button === "Post" ? handlePostClick :
                                    button === "Profile" ? handleProfileClick :
                                        button ==="Home" ? () => navigate("/"):
                                            button === "Login" ? () => navigate("/login") : undefined
                            }
                        >
                            {button}
                        </button>
                    </li>
                ))}
            </ul>
            {isLoggedIn && (
                <div className="user-info" onClick={handleProfileClick}>
                    <user-infop>Hello {userFullName}</user-infop>
                    <user-infop>{userEmail}</user-infop>
                </div>
            )}
            {isPostModalOpen && <PostModal onClose={() => setIsPostModalOpen(false)} />}
        </div>
    );
};

export default withAuth(LeftColumn);