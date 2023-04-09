import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedSwitcher from "./FeedSwitcher";
import Feed from "./Feed";
import "./MiddleColumn.css";
import withAuth from "../../auth";
import Post from "./post";

const MiddleColumn = ({ isLoggedIn }) => {
    const [feedType, setFeedType] = useState("For You");
    const [posts, setPosts] = useState([]);

    const localData = [
        {
            first_name: 'Alice',
            last_name: 'Johnson',
            email: 'alice.johnson@example.com',
            post_title: 'Hello World!',
            post_image: 'sample1',
            post_datetime: '2023-04-08T10:00:00',
        },
        {
            first_name: 'Bob',
            last_name: 'Smith',
            email: 'bob.smith@example.com',
            post_title: 'This is a post.',
            post_image: 'sample2',
            post_datetime: '2023-04-08T12:30:00',
        },
        {
            first_name: 'Charlie',
            last_name: 'Brown',
            email: 'charlie.brown@example.com',
            post_title: 'React is awesome!',
            post_image: 'sample3',
            post_datetime: '2023-04-07T15:00:00',
        },
    ];

    useEffect(() => {
        fetchData();

    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("load_posts.php");
            const data = response.data.posts;
            console.log("response",response)
            console.log(localData)
            console.log("responsedata",response.data)
            console.log("posts",data)
            //Combine the server data with the local data
            const combinedData = [...data,...localData];
            console.log("Combined data:", combinedData);
            setPosts(combinedData);


        } catch (error) {
            console.error("Error fetching data:", error);
            setPosts(localData);
        }
    };

    return (
        <div className="middle-column">
            <FeedSwitcher onSwitch={setFeedType} active={feedType} />
            <div className="scrollable-area">
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        author={`${post.first_name} ${post.last_name}`}
                        email={post.email}
                        content={post.post_title}
                        image={post.post_image}
                        postDateTime={post.post_datetime}
                    />
                ))}
            </div>
        </div>
    );
};

export default withAuth(MiddleColumn);