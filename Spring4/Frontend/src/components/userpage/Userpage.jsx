import React, { useState, useEffect } from 'react';
import './userpage.css';
import "./Buttonswitch.css";

import {useNavigate} from "react-router-dom"
import withAuth from '../../auth.js';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Right_column from "./rightcolum";


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
            <div className='UserPage'>
            </div>
            <div className='User'>
                <button type='button' className='Back' onClick={()=>navigate("/")}>
                    <p4>Back</p4>
                    <br/></button>
                <div className='username'>
                    <button type='button' className='Image'>
                        <p5>Image</p5>
                        <br/></button>
                    <p8>{user_first_name}</p8>
                </div>

                { showButton &&
                <button type='button' className='following' onClick={handleclick}  >
                    {buttontext}
                </button>
                }
            </div>
            <div className='information'>
                <div className= 'FirstName'>
                    <p22>FirstName:{user_first_name}</p22>
                </div>
                <div className='LastName'>
                    <p23>LastName:{user_last_name}</p23>
                </div>
                <div className = 'Age'>
                    <p20>Age:{user_age}</p20>
                </div>
                <div className= 'Email'>
                    <p21>Email:{user_email}</p21>
                </div>
            </div>
            <div className = 'Right'>
                <Right_column email = {userEmail}/>
            </div>
        </div>
    );

}
export default withAuth(Userpage);

