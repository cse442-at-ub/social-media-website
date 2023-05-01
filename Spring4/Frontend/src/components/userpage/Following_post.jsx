import React from "react";
import "./Following_post_styple.css";
//import "./Following_post.css"
import {Link} from "react-router-dom"

// this file will help to display the page content in similar format as post.js
// it will reuse some of code in post.js

const Following_post = ({ author,email}) => {

    // this page will dilay author

    return (
        < div className= "following_post">
            <div className="following_post-header">
                <Link to = {`/userpage/${email}`} className= "following_post-author-link">
                    <img
                        className="following_post-avatar"
                        src = {`https://i.pravatar.cc/50?u=${author}`}
                        alt = {author}
                    />

                    <div className="following_post-author-info">
                        <span className="following_post-author">{author}</span>
                    </div>

                </Link>

            </div>

        </div>



    );



};

export default Following_post