import React from "react";
import "./rightcolum.css";
import ButtonSwitcher from "./Buttonswitch";

const Right_column = () => {
    return (
        <div className="Right-column">
            <div className="Right-column-content">
                <ButtonSwitcher />
            </div>
        </div>
    );
};

export default Right_column;