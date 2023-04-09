import './Album.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Album = () => {

    return (
        <div className="App23">
            <div className='UserPage'>
                <LeftColumn />
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