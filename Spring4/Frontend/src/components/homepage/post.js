import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import  { useState } from "react";
import axios from "axios";

const Post = ({ author, content, image, postDateTime,email, id, useremail}) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = async () => {
        setLiked(!liked);
        // 在这里向后端发送点赞状态
        console.log(id)
        console.log(useremail)
        try {

            const response = await axios.post("handle_like.php", {
                postId: id,
                userEmail: useremail,
            });

            if (response.status === 200) {
                // 处理成功的响应

            }
        } catch (error) {
            setLiked(liked); // 还原点赞状态
            alert("please like again")
        }
    };

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
                {image && (
                    <img className="post-image" src={`./uploads/${image}`}  />
                )}
            </div>
            <div className="post-footer">
                <FontAwesomeIcon
                    className="like-button"
                    icon={faThumbsUp}
                    onClick={toggleLike}
                    color={liked ? "#007bff" : ""}
                />
            </div>
        </div>
    );
};

export default Post;