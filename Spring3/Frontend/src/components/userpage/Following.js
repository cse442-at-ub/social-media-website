import './Following.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";


const Following = () => {

    return (
        <div className="App45">
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className='Following'>
                <p14>You did not follow any user !</p14>

            </div>
            <div className = 'Right'>
                <Right_column />
            </div>
        </div>

    );

}
export default Following;