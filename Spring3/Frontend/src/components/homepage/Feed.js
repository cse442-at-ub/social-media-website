import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./post";

const Feed = ({ type, isLoggedIn, posts, updatePosts }) => {
    const [followingLength, setFollowingLength] = useState(null);

    useEffect(() => {
        if (posts.length === 0) {
            fetchData();
        }
    }, [type]);

    const fetchData = async () => {
        try {
            const endpoint =
                type === "Following" ? "load_following_posts.php" : "load_posts.php";
            const response = await axios.get(endpoint);
            const data = response.data.posts;
            updatePosts(type, data);

            if (type === "Following") {
                setFollowingLength(response.data.posts_count);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("please refresh page")
            return;
        }
    };

    return (
        <div>
            {type === "Following" && !isLoggedIn ? (
                <p className="feed-message">Please log in to see the Following feed.</p>
            ) : followingLength === 0 ? (
                <p className="feed-message">The user is not following anyone.</p>
            ) : (
                posts.map((post, index) => (
                    <Post
                        key={index}
                        author={`${post.first_name} ${post.last_name}`}
                        content={post.post_title}
                        image={post.post_image}
                        postDateTime={post.post_datetime}
                        email={post.email}
                    />
                ))
            )}
        </div>
    );
};

export default Feed;


