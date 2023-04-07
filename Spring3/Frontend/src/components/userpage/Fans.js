import React from 'react';
import './userpage.css';
import "./RightColumn.css";
import './Fans.css'

import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Fans = () => {
    const leftButtons = ["Home", "Profile", "Messages", "Post"];

    return (
        <div className="App">
            <div className='UserPage'>
                <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='Fan'>
                <p13>No one is following You !</p13>

            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default Fans;