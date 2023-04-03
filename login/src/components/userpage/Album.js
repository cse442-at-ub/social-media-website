import './Album.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Album = () => {
    const leftButtons = ["Home", "Profile", "Messages", "Post"];

    return (
        <div className="App">
            <div className='UserPage'>
                <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='Blog'>
                <p16>You did not put any photos !</p16>

            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default Album;