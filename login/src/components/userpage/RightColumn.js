import React from "react";
import "./RightColumn.css";

import {useNavigate} from "react-router-dom"
const RightColumn = () => {
    const navigate = useNavigate();
    return (
        <div className="right-column">
            <div className="right-column-content">
                <div className='UserPage'>
                    <button type='button' className='MyPage' onClick={()=>navigate("/userpage")}>
                        <p1>My Page</p1>
                        <br/></button>
                    <button type='button' className='MyFans' onClick={()=>navigate("/Fans")}>
                        <p2>My Fans</p2>
                        <br/></button>
                    <button type='button' className='MyFollowing' onClick={()=>navigate("/Following")}>
                        <p3>My Following</p3>
                        <br/></button>
                    <button type='button' className='MyBlog' onClick={()=>navigate("/Blogs")}>
                        <p6>My Blog</p6>
                        <br/></button>
                    <button type='button' className='MyAlbum' onClick={()=>navigate("/Album")}>
                        <p7>My Album</p7>
                        <br/></button>
                </div>
            </div>
        </div>
    );
};

export default RightColumn;