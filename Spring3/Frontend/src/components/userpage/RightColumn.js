import React from "react";
import "./RightColumn.css";

import {useNavigate} from "react-router-dom"

const RightColumn = ({email}) => {
    const navigate = useNavigate();

    const path = "/userpage/" + email;


    return (

        <div className="right-column2">
            <div className="right-column-content2">
                <div className='UserPage'>
                    <button type='button' className='MyPage' onClick={()=>navigate(path)}>
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