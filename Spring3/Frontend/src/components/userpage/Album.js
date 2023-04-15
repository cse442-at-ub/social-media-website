import './Album.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";


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
                <Right_column />
            </div>
        </div>

    );

}
export default Album;