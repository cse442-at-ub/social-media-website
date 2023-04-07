import './Blogs.css'
import React from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";


const Blogs = () => {
    const leftButtons = ["Home", "Profile", "Messages", "Post"];

    return (
        <div className="App">
            <div className='UserPage'>
                <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='Blog'>
                <p15>You did not put any Blogs !</p15>

            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default Blogs;