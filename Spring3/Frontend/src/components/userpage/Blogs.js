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
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('load_personal_posts.php');
                const data = response.data;
                console.log("this is blog response.data")
                console.log(data)

                if (data.cookie_is_set){
                    const postTitles = data.posts.map(post => post.post_title);
                    const postDate = data.posts.map(post => post.post_datetime);
                    const firstPostName = data.posts.map(post => post.first_name);
                    const lastPostName = data.posts.map(post => post.last_name);
                    setPostTitles(data.posts);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (isLoggedIn){
            console.log("current people is ")
            console.log(userEmail)
            console.log("he is view the other user")
            console.log(current_user_email)

            axios.post('load_profile_posts.php', {
                user_email: current_user_email
            })
                .then((response) => {
                    console.log("this is the response data from userpage")
                    console.log(response.data)

                    setUserData(response.data);

                }, (error) => {
                    console.log(error);
                    console.log("userpage failed")
                });
        }
        fetchData();
    }, []);


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