import './Following.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Following = () => {
    const leftButtons = ["Home", "Profile", "Messages", "Post"];

    return (
        <div className="App">
            <div className='UserPage'>
                <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='Following'>
                <p14>You did not follow any user !</p14>

            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default Following;