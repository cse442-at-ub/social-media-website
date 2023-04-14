import React from 'react';
import './userpage.css';
import "./RightColumn.css";

import {useNavigate} from "react-router-dom"
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";
import withAuth from '../../auth.js';
import { useParams } from 'react-router-dom';

const Userpage = ({isLoggedIn, userFullName, userLastName, userEmail, userAge, userFirstName}) => {
    const navigate = useNavigate();
    // added for fetch user name url
    const { username } = useParams()

    return (
        <div className="App123">
            <div className='UserPage'>
            <LeftColumn />
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
            <div className= 'FirstName'>
                {/*added for display current user page user name*/}
                {/*<p22>Welcome to {username}'s user page!</p22>*/}
                {/*added for display current user page user name*/}
                <p22>FirstName:{userFirstName}</p22>
            </div>
            <div className='LastName'>
                <p23>LastName:{userLastName}</p23>
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