import React, { useState, useEffect } from 'react';
import './userpage.css';
import "./Buttonswitch.css";

import {useNavigate} from "react-router-dom"
import withAuth from '../../auth.js';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Right_column from "./rightcolum";
import "../homepage/Post.css";


const Userpage = ({isLoggedIn, userFullName, userLastName, userEmail, userAge, userFirstName}) => {
    const navigate = useNavigate();
    // added for fetch user name url
    const { current_user_email } = useParams()

    const [showButton, setShowButton] = useState(true);

    const [userData, setUserData] = useState(null);
    const [buttontext, setButtontext] = useState('Follow')

    const handleclick = () =>{
        if (isLoggedIn === false){
            alert("please log in before follow other people")

        }
        else{
            // suppose user already follow the user
                if (buttontext === 'Follow' && isLoggedIn === true){
                    // here, I may need to send the data to backend, since I click the button
                    setButtontext('Following')
                    // also, send the data to backend
                    // send axios post to backend to add follower
                    // change the name to be " ***.php "
                    axios.post('handle_add_follow.php', {
                        user_email: current_user_email
                    })
                        .then((response) => {
                            console.log("this is the response data from userpage in follow button")
                            console.log(response.data);
                            console.log("follow saved")
                            console.log('follow_status:', response.data.follow_status);
                            // check if follow this person failed

                            const follow_status = response.data.follow_status;
                            if (follow_status !== "success"){
                                alert("fail to insert into follows table")
                            }



                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }




            }

        }



    useEffect(() => {
        // We will simply using url to directly update our page
        // but first, this user must be login
            console.log("current people is ")
            console.log(userEmail)
            console.log("he is view the other user")
            console.log(current_user_email)


            axios.post('load_profiles.php', {
                user_email: current_user_email
            })
                .then((response) => {
                    console.log("this is the response data from userpage")
                    console.log(response.data)

                    setUserData(response.data);

                    // make additional change for the page
                    // if user login and view other people's profile
                    // we will show following button
                    if (isLoggedIn === true && current_user_email === userEmail){
                        setShowButton(false)
                    }

                    const isFollowed = response.data.is_followed;
                    if (isFollowed === true){
                        setButtontext('Following')
                    }


                    // if not login, click the button, show pop up

                }, (error) => {
                    console.log(error);
                    console.log("userpage failed")
                });

    }, [current_user_email, userEmail, isLoggedIn, showButton, buttontext]);
    // notice line 45 use 'current_user_email' to trigger page re-render.
    // everytime current_user_email which come from url changed, the page will reload.

    if (!userData) {
        // render a loading spinner or placeholder content while waiting for data
        return <div>Loading...</div>
    }

    const { user_email, user_first_name, user_last_name, user_full_name, user_date_of_birth, user_age } = userData;

    return (
        <div className="App123">
            <div className='User'>
                <button type='button' className='Back' onClick={()=>navigate("/")}>
                    <p4>Back</p4>
                    <br/></button>
                <div className= "post-author-link">
                    <img
                        className="post-avatar"
                        src = {`https://i.pravatar.cc/50?u=${user_first_name}`}
                        alt = {user_first_name}
                    />
                    <div className="post-author-info">
                        <span className="post-author">{user_first_name}</span>
                    </div>
                </div>

                { showButton &&
                <button type='button' className='following' onClick={handleclick}  >
                    {buttontext}
                </button>
                }
            </div>
            <div className='information'>
                <div className='userpage-info'>
                    <p className='info-item'>FirstName: {user_first_name}</p>
                    <p className='info-item'>LastName: {user_last_name}</p>
                    <p className='info-item'>Age: {user_age}</p>
                    <p className='info-item'>Email: {user_email}</p>
                </div>
            </div>


            <div className = 'Right'>
                <Right_column email = {userEmail}/>
            </div>
        </div>
    );

}
export default withAuth(Userpage);

