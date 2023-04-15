import './Album.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import {useParams} from "react-router-dom";


const Album = () => {
    const { current_user_email } = useParams()
    return (
        <div className="App23">
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className='Album'>
                <p30>Album</p30>
                <p16>You did not put any photos !</p16>

            </div>
            <div className = 'Right'>
                <Right_column email={current_user_email}/>
            </div>
        </div>

    );

}
export default Album;