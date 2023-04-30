import './Following.css'
import './Blogs.css'
import '../homepage/MiddleColumn.css'
import React, {useEffect, useState} from 'react';
import LeftColumn from "../homepage/LeftColumn";
import Right_column from "./rightcolum";
import {useParams} from "react-router-dom";
import withAuth from "../../auth";
import axios from "axios";
import Following_post from "./Following_post";

const Fans = ({isLoggedIn, userEmail}) => {

    const { current_user_email } = useParams()

    const [follower_data, setFollowerData] = useState(null)

    // use useEffect to refresh the page
    // take the post, and use the post to update the page
    useEffect(() => {
        // We will simply using url to directly update our page
        // but first, this user must be login
        console.log("current people is ")
        console.log(userEmail)
        console.log("he is view the other user")
        console.log(current_user_email)


        axios.post('load_profile_followers_page.php', {
            user_email: current_user_email
        })
            .then((response) => {
                console.log("this is the response data from Follower_post")
                console.log(response.data)

                const follower_data = response.data.followers
                console.log("this is follower data", follower_data)

                setFollowerData(follower_data)



            }, (error) => {
                console.log(error);
                console.log("Follower_post failed")
            });

    }, [current_user_email, userEmail, isLoggedIn]);
    // notice line 45 use 'current_user_email' to trigger page re-render.
    // everytime current_user_email which come from url changed, the page will reload.


    return (
        <div>
            <div className='UserPage'>
                <LeftColumn />
            </div>
            <div className="gradient-border" id="box">
                Follower
            </div>
            <div className='Blog'>

                { follower_data  && follower_data.length === 0 ? (
                    <>

                        <p14>You did not have any followers !</p14>

                    </>
                ) : (
                    follower_data && follower_data.map((post, index) => (
                        <Following_post
                            key={index}
                            author={`${post.first_name} ${post.last_name}`}
                            email={post.email}
                        />
                    ))
                )}

            </div>

            <div className = 'Right'>
                <Right_column email={current_user_email}/>
            </div>

        </div>



    )



}



export default withAuth(Fans);