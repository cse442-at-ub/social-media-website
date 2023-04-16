import './Following.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import {useParams} from "react-router-dom";


const Following = () => {
    const { current_user_email } = useParams()
    return (
        <div className="App45">
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className='Following'>
                <p32>Following</p32>
                <p14>You did not follow any user !</p14>

            </div>
            <div className = 'Right'>
                <Right_column email={current_user_email}/>
            </div>
        </div>

    );

}
export default Following;