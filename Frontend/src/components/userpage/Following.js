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

const Following = ({isLoggedIn, userEmail}) => {

    const { current_user_email } = useParams()

    const [following_data, setFollowingData] = useState(null)

    // use useEffect to refresh the page
    // take the post, and use the post to update the page
    useEffect(() => {
        // We will simply using url to directly update our page
        // but first, this user must be login
        console.log("current people is ")
        console.log(userEmail)
        console.log("he is view the other user")
        console.log(current_user_email)


        axios.post('load_profile_following_page.php', {
            user_email: current_user_email
        })
            .then((response) => {
                console.log("this is the response data from Following_post")
                console.log(response.data)

                const following_data = response.data.followers
                console.log("this is following data", following_data)

                setFollowingData(following_data)



            }, (error) => {
                console.log(error);
                console.log("Following_post failed")
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
                Following
            </div>
                    <div className='Blog'>
                        {/*<p32>Following</p32>*/}
                        {/*<p14>You did not follow any user !</p14>*/}

                        { following_data  && following_data.length === 0 ? (
                            <>

                            {/*<p32>Following</p32>*/}
                            <p14>You did not follow any user !</p14>

                            </>
                        ) : (
                            following_data && following_data.map((post, index) => (
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



export default withAuth(Following);