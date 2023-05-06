import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import  { useState } from "react";
import axios from "axios";

const Post = ({ author, content, image, postDateTime,email, id, useremail, like_count, isliked, username, commentdata, isLoggedIn}) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(
        commentdata.map((item) => {
            const [name, comment] = item.split(":");
            return { name, comment };
        })
    );
    const [newComment, setNewComment] = useState("");
    const [commentLength, setCommentLength] = useState(0);


    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentChange = (event) => {
        const inputLength = event.target.value.length;

        if (inputLength <= 100) {
            setNewComment(event.target.value);
            setCommentLength(inputLength);
        }
    };

    const handleCommentSubmit = async (event) => {

        event.preventDefault();
        if (!isLoggedIn) {
            alert("Please log in to commenting the post.");
            return;
        }
        if (newComment.trim() !== "") {
            const newCommentData = { name: username, comment: newComment };
            console.log(newComment)


            console.log(newComment)
            // 在这里向后端发送评论数据
            try {
                const response = await axios.post("handle_comment.php", {
                    postId: id,
                    comment: newComment,
                    userEmail: useremail,
                });

                if (response.status === 200) {
                    // 处理成功的响应
                    setComments([...comments, newCommentData]);
                    setNewComment("");
                }
            } catch (error) {
                // 处理错误的响应
                alert("Error submitting comment, please try again");
            }
        }
    };

    const [liked, setLiked] = useState(isliked);
    const [likeCount, setLikeCount] = useState(like_count)
    const toggleLike = async () => {
        if (!isLoggedIn) {
            alert("Please log in to like the post.");
            return;
        }
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
        <div className="post">
            <div className="post-header">
                <Link to={`/Blogs/${email}`} className="post-author-link">
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
                <span className="like-count">{likeCount}</span>
                <button className="toggle-comments" onClick={toggleComments}>
                    {showComments ? "Hide Comments" : "Show Comments"}
                </button>
            </div>
            {showComments && (
                <div className="comments">
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                            type="text"
                            className="comment-input"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                        />
                        <button type="submit" className="submit-comment">
                            Send
                        </button>
                    </form>
                    <div className="comment-length-counter">{commentLength}/100</div>
                    <ul className="comment-list">
                        {comments.map((comment, index) => (
                            <li key={index} className="comment">
                                <strong>{comment.name}:</strong> {comment.comment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Post;