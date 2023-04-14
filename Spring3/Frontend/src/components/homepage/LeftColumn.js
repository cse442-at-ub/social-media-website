import React, { useState } from "react";
import "./LeftColumn.css";
import PostModal from "./PostModal";
import { useNavigate } from "react-router-dom";
import withAuth from '../../auth.js';
import axios from "axios";
// import {toast} from "react-toastify";

const LeftColumn = ({ isLoggedIn, userFullName, userEmail, userAge }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const leftButtons = isLoggedIn
        ? ["Home", "Profile", "Post", "Logout"]
        : ["Home", "Profile", "Post", "Login"];
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
        // here I will make a post request for the php to cancel logout
        axios.post('handle_logout.php', {
            // do I need to send anything ?
        })
            .then((response) => {
                // change the login status into false
                console.log("this is the response itself")
                console.log(response);
                window.location.reload();

            }, (error) => {
                console.log(error);
            });
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
                                            // added for logout button
                                            button === "Logout" ? handleLogoutClick :
                                                button === "Login" ? () => navigate("/login"): undefined


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