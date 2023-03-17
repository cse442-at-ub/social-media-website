import React, { useState } from "react";
import "./LeftColumn.css";
import PostModal from "./PostModal";
import {useNavigate} from "react-router-dom"


const LeftColumn = ({ buttons }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

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
                {buttons.map((button) => (
                    <li>
                        <button
                            key={button}
                            className={`left-column-button ${
                                button === "Post" && "left-column-button-post"
                            }`}
                            onClick={button === "Post" ? handlePostClick :
                                button === "Profile" ? handleProfileClick : undefined}
                        >
                            {button}
                        </button>
                    </li>
                ))}
                <li>
                    <button className="left-column-button"onClick={()=>navigate("/login")}>Login</button>
                </li>
            </ul>
            {isPostModalOpen && <PostModal onClose={() => setIsPostModalOpen(false)} />}
        </div>
    );
};

export default LeftColumn;