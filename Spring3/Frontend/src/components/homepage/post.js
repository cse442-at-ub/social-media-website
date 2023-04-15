import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
const Post = ({ author, content, image, postDateTime,email }) => {
    return (
        <div className="post">
            <div className="post-header">
                <Link to={`/userpage/${email}`} className="post-author-link">
                    <img
                        className="post-avatar"
                        src={`https://i.pravatar.cc/50?u=${author}`}
                        alt={author}
                    />
                    <div className="post-author-info">
                        <span className="post-author">{author}</span>
                    </div>
                </Link>
                <span className="post-date">{postDateTime}</span>
            </div>
            <div className="post-content">
                <h3 className="post-title">{content}</h3>
                {image && <img src={`./uploads/${image}`}/>}
            </div>
        </div>
    );
};

export default Post;