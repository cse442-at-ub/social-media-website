import './Blogs.css'
import React,{useEffect, useState} from 'react';
import LeftColumn from "../homepage/LeftColumn";
import RightColumn from "./RightColumn";
import withAuth from '../../auth.js';
import axios from 'axios';


// const checkblogs = async()  => {
//     try {
//        const response = await axios.get('load_personal_posts.php');
//        const data = response.data
//        if (data.cookie_is_set){
//            const postTitles = response.data.posts.map(post => post.post_title);
//            const firstPostFirstName = response.data.posts[0].first_name;
//            const date_arr = response.data.posts.map(post => post.post_datetime);
//            console.log(postTitles);
//        }
//     }catch (error) {
//         console.error('Error check blogs:', error);
//         return { isLoggedIn: false };
//     }
// } ;
function BlogPosts() {
    const [postTitles, setPostTitles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('load_personal_posts.php');
                const data = response.data;

                if (data.cookie_is_set){
                    const postTitles = data.posts.map(post => post.post_title);
                    setPostTitles(postTitles);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className = 'showPosts'>
            <h2>Blog Posts</h2>
            <ul>
                {postTitles.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul>
        </div>
    );
}

const Blogs = ({isLoggedIn}) => {
    const leftButtons = ["Home", "Profile", "Post"];
    return (
        <div className="App">
            <div className='UserPage'>
                <LeftColumn  buttons={leftButtons} />
            </div>
            <div className='Blog'>
                <p15>You did not put any Blogs !</p15>
                <BlogPosts />
            </div>
            <div className = 'Right'>
                <RightColumn />
            </div>
        </div>

    );

}
export default withAuth(Blogs);