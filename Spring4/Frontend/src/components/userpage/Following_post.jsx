import React from "react";
import "../homepage/Post.css";
//import "./Following_post.css"
import {Link} from "react-router-dom"

// this file will help to display the page content in similar format as post.js
// it will reuse some of code in post.js

const Following_post = ({ author,email}) => {

    // this page will dilay author

    return (
        < div className= "post">
            <div className="post-header">
                <Link to = {`/userpage/${email}`} className= "post-author-link">
                    <img
                        className="post-avatar"
                        src = {`https://i.pravatar.cc/50?u=${author}`}
                        alt = {author}
                    />

                    <div className="post-author-info">
                        <span className="post-author">{author}</span>
                    </div>

                </Link>

            </div>

        </div>



    );



};

export default Following_post