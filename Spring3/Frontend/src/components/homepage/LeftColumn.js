import React, { useState } from "react";
import "./LeftColumn.css";
import PostModal from "./PostModal";
import { useNavigate } from "react-router-dom";
import withAuth from '../../auth.js';
import axios from "axios";
import {toast} from "react-toastify";

const LeftColumn = ({ isLoggedIn, userFullName, userEmail, userAge }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const leftButtons = isLoggedIn
        ? ["Home", "Profile", "Post"]
        : ["Home", "Profile", "Post", "Login", "Logout"];
    const handleProfileClick = () =>
    {
        if (!isLoggedIn) {
            alert("Please log in to create a post.");
            return;
        }
        navigate("/userpage");
    };
    const handlePostClick = () => {
        setIsPostModalOpen(true);
    };

    // added for logout
    const handleLogoutClick= () => {
        if (!isLoggedIn) {
            alert("Please log in before log out");
            return;
        }
        // suppose user has already log in, we will handle the logout
        alert("not implemented");
        // here I will make a post request for the php to cancel logout
        // axios.post('handle_logout.php', {
        //     // do I need to send anything ?
        //
        //
        // })
        //     .then((response) => {
        //         console.log("this is the response itself")
        //         console.log(response);
        //
        //     }, (error) => {
        //         console.log(error);
        //     });
    }



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
                                            button === "Login" ? () => navigate("/login"):
                                                // added for logout button
                                                button === "Logout" ? ()  => handleLogoutClick : undefined
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