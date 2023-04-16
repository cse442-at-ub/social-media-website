import './Blogs.css'
import React, {useEffect, useState} from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import withAuth from '../../auth.js';
import axios from 'axios';
import Post from "../homepage/post";
import {useParams} from "react-router-dom";


const Blogs = ({isLoggedIn, userEmail}) => {
    const [postTitles, setPostTitles] = useState([]);
    const { current_user_email } = useParams()
    // const [userData, setUserData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                // check if logged in and then fetch data from user
                    console.log("in blog page now")
                    console.log("current people is ")
                    console.log(userEmail)
                    console.log("he is viewing the other user")
                    console.log(current_user_email)
                    const response = await axios.post('load_profile_posts.php', {
                        user_email: current_user_email
                    });
                    console.log("this is the response data from blog")
                    console.log(response.data)

                    const post = response.data.post
                    const postTitles = response.data.posts.map(post => post.post_title);
                    const postDate = response.data.posts.map(post => post.post_datetime);
                    const firstPostName = response.data.posts.map(post => post.first_name);
                    const lastPostName = response.data.posts.map(post => post.last_name);
                    setPostTitles(response.data.posts);

            } catch (error) {
                console.log(error);
                console.log("user page failed")
            }
        }
        fetchData();
    }, [current_user_email, isLoggedIn, setPostTitles, userEmail]);


    return (
        <div className="App13">
            <div className='UserPage'>
                <LeftColumn   />
            </div>
            <p33>Blog</p33>
            <div className='Blog'>
                {postTitles.length === 0 ? (
                    <p15>You did not put any Blogs!</p15>
                ) : (
                    postTitles.map((post, index) => (
                        <Post
                            key={index}
                            author={`${post.first_name} ${post.last_name}`}
                            email={post.email}
                            content={post.post_title}
                            image={post.post_image}
                            postDateTime={post.post_datetime}
                        />
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