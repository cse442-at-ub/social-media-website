import './Blogs.css'
import React, {useEffect, useState} from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import withAuth from '../../auth.js';
import axios from 'axios';
import Blog2 from "./Blog2";
//import Post from "../homepage/post";
import {useParams} from "react-router-dom";


const Blogs = ({isLoggedIn, userEmail, id, userFirstName}) => {
    const [postTitles, setPostTitles] = useState([]);
    const { current_user_email } = useParams()

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                // check if logged in and then fetch data from user
                    console.log("in blog page now")
                    console.log("current people is ")
                    console.log(userEmail)
                    console.log("he is viewing the other user")
                    console.log(current_user_email)
                    const response = await axios.post('load_personal_posts.php', {
                        user_email: current_user_email
                    });
                    console.log("this is the response data from blog")
                    console.log(response)

                    // const post = response.data.posts
                    // const ID = response.data.posts.map(post=>post.post_id)
                    // const postTitles = response.data.posts.map(post => post.post_title);
                    // const postDate = response.data.posts.map(post => post.post_datetime);
                    // const firstPostName = response.data.posts.map(post => post.first_name);
                    // const lastPostName = response.data.posts.map(post => post.last_name);

                    setPostTitles(response.data.posts);

            } catch (error) {
                console.log(error);
                console.log("user page failed")
            }
        }
        fetchData();
    }, [current_user_email, isLoggedIn, setPostTitles, userEmail]);

    const handleDelete = async (Post_ID) => {
        try {
            console.log(Post_ID)
            console.log(current_user_email)
            // Replace this with your actual API call
            const response2 = await axios.post('handle_del_post.php', { post_id: Post_ID, user_email: current_user_email });
            if (response2.status === 200) {
                // 处理成功的响应
                window.location.reload();

            }
            // Remove the post from the local state after successful deletion
            // setPostTitles((prevPostTitles) =>
            //     prevPostTitles.filter((post) => post.post_id !== postId)
            // );
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="App13">
            <div className='UserPage'>
                <LeftColumn   />
            </div>
            <div className="gradient-border" id="box">
                Blog
            </div>
            <div className='Blog'>
                {postTitles && postTitles.length === 0 ? (
                    <p15>You did not put any Blogs!</p15>
                ) : (
                    postTitles && postTitles.map((post, index) => (
                        <div key={index} className="post-with-delete-button">
                        <Blog2
                            key={index}
                            author={`${post.first_name} ${post.last_name}`}
                            email={post.email}
                            content={post.post_title}
                            image={post.post_image}
                            postDateTime={post.post_datetime}
                            id={post.post_id}
                            useremail = {userEmail}
                            like_count = {post.num_likes}
                            isliked = {post.like_or_cancel}
                            username ={userFirstName}
                            commentdata = {post.comments}
                        />
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(post.post_id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}

            </div>
            <div className = 'Right'>
                <Right_column email={current_user_email}/>
            </div>
        </div>

    );

}
export default withAuth(Blogs);