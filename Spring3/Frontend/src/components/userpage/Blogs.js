import './Blogs.css'
import React, {useEffect, useState} from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";
import withAuth from '../../auth.js';
import axios from 'axios';
import Post from "../homepage/post";


// const checkblogs = async()  => {
//     try {
//        const response = await axios.get('load_personal_posts.php');
//        const data = response.data
//
//        if (data.cookie_is_set){
//            const postTitles = response.data.posts.map(post => post.post_title);
//            const firstPostFirstName = response.data.posts[0].first_name;
//            const date_arr = response.data.posts.map(post => post.post_datetime);
//
//            console.log(postTitles);
//
//        }
//
//     }catch (error) {
//         console.error(error);
//     }
// } ;



const Blogs = ({isLoggedIn}) => {
    const [postTitles, setPostTitles] = useState([]);


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
        fetchData();
    }, []);


    return (
        <div className="App13">
            <div className='UserPage'>
                <LeftColumn   />
            </div>
            <div className='Blog'>
                {postTitles.length === 0 ? (
                    <p>You did not put any Blogs!</p>
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
                <RightColumn />
            </div>
        </div>

    );

}
export default withAuth(Blogs);