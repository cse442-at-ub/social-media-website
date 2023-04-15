import React from 'react';
import './userpage.css';
import './Fans.css'

import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";


const Fans = () => {

    return (
        <div className="App34">
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className='Fan'>
                <p13>No one is following You !</p13>

            </div>
            <div className = 'Right'>
                <Right_column />
            </div>
        </div>

    );

}
export default Fans;