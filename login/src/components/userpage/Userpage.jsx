import React from 'react';
import './userpage.css';
import "./RightColumn.css";

import {useNavigate} from "react-router-dom"
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Userpage = () => {
    const leftButtons = ["Home", "Profile", "Messages", "Post"];
    const navigate = useNavigate();

    return (
        <div className="App">
            <div className='UserPage'>
            <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='User'>
                <button type='button' className='Back' onClick={()=>navigate("/")}>
                    <p4>Back</p4>
                    <br/></button>
                <div className='username'>
                    <button type='button' className='Image'>
                        <p5>Image</p5>
                        <br/></button>
                    <p8>Name</p8>
                </div>
            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default Userpage;