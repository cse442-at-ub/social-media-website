import React from "react";
import "./Post.css";

const Post = ({ author, content, image, postDateTime }) => {
    return (
        <div className="post">
            <div className="post-header">
                <img
                    className="post-avatar"
                    src={`https://i.pravatar.cc/50?u=${author}`}
                    alt={author}
                />
                <div className="post-author-info">
                    <span className="post-author">{author}</span>
                    <span className="post-date">{postDateTime}</span>
                </div>
            </div>
            <div className="post-content">
                <h3 className="post-title">{content}</h3>
                <img src={`https://picsum.photos/200?random=${image}`} alt={content} />
            </div>
        </div>
    );
};

export default Post;