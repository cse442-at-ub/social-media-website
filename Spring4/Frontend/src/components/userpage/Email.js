import LeftColumn from "../homepage/LeftColumn";
import Userpage from "./Userpage";
import Right_column from "./rightcolum";
import React from "react";
import {useParams} from "react-router-dom";

const Email = ()=>{
    const { current_user_email } = useParams()
    return(
        <div className={'userpage'}>
            <LeftColumn />
            <Userpage />;
            <Right_column email = {current_user_email}/>
        </div>
    )
}

export default Email
