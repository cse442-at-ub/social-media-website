import React from "react";
import "./Blog2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import  { useState } from "react";
import axios from "axios";

const Post = ({ author, content, image, postDateTime,email, id, useremail, like_count, isliked}) => {
    const [liked, setLiked] = useState(isliked);
    const [likeCount, setLikeCount] = useState(like_count)
    const toggleLike = async () => {
        if (email === useremail){
            alert("you can not like your post")
            return
        }
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);

        // 在这里向后端发送点赞状态
        console.log(id)
        console.log(useremail)
        console.log(!liked)

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
            setLikeCount(liked ? likeCount + 1 : likeCount - 1);
            alert("please like again")
        }
    };

    return (
        <div className="post2">
            <div className="post2-header">
                <Link to={`/Blogs/${email}`} className="post2-author-link">
                    <img
                        className="post2-avatar"
                        src={`https://i.pravatar.cc/50?u=${author}`}
                        alt={author}
                    />
                    <div className="post2-author-info">
                        <span className="post2-author">{author}</span>
                    </div>
                </Link>
                <span className="post2-date">{postDateTime}</span>
            </div>
            <div className="post2-content">
                <h3 className="post2-title">{content}</h3>
                {image && (
                    <img className="post2-image" src={`./uploads/${image}`}  />
                )}
            </div>
            <div className="post2-footer">
                <FontAwesomeIcon
                    className="like2-button"
                    icon={faThumbsUp}
                    onClick={toggleLike}
                    color={liked ? "#007bff" : ""}
                />
                <span className="like2-count">{likeCount}</span>
            </div>
        </div>
    );
};

export default Post;