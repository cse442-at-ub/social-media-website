import React from 'react';
import './userpage.css';
import "./RightColumn.css";

import {useNavigate} from "react-router-dom"
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";
import withAuth from '../../auth.js';


const Userpage = ({isLoggedIn, userFullName, userLastName, userEmail, userAge, userFirstName}) => {
    const leftButtons = ["Home", "Profile", "Post"];
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
                    <p8>{userFirstName}</p8>
                </div>
            </div>
            <div className= 'Fullname'>
                <p22>{userFullName}</p22>
            </div>
            <div className = 'Age'>
                <p20>Age:{userAge}</p20>
            </div>
            <div className= 'Email'>
                <p21>Email:{userEmail}</p21>
            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default withAuth(Userpage);