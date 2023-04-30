import React from 'react';
import './userpage.css';
import './Fans.css'

import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import {useParams} from "react-router-dom";


const Fans = () => {
    const { current_user_email } = useParams()
    return (
        <div className="App34">
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className='Fan'>
                <div className="gradient-border" id="box">
                    Follower
                </div>
                <p13>No one is following You !</p13>

            </div>
            <div className = 'Right'>
                <Right_column email={current_user_email}/>
            </div>
        </div>

    );

}
export default Fans;