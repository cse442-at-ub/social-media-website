import React from "react";
import "./rightcolum.css";
import ButtonSwitcher from "./Buttonswitch";

const Right_column = ({email}) => {
    return (
        <div className="Right-column">
            <div className="Right-column-content">
                <ButtonSwitcher email = {email}/>
            </div>
        </div>
    );
};

export default Right_column;