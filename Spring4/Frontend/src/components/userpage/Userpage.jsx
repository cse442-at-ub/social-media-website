import React, { useState, useEffect } from 'react';
import './userpage.css';
import "./Buttonswitch.css";

import {useNavigate} from "react-router-dom"
import withAuth from '../../auth.js';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Right_column from "./rightcolum";
import "./Following_post_styple.css";


const Userpage = ({isLoggedIn, userFullName, userLastName, userEmail, userAge, userFirstName}) => {
    const navigate = useNavigate();
    // added for fetch user name url
    const { current_user_email } = useParams()

    const [show_following_Button, setShow_following_Button] = useState(true);
    const [buttontext, setButtontext] = useState('Follow')
    const [show_edit_button, setShow_edit_button] = useState(false)
    const [edit_button_text, set_edit_Buttontext] = useState('Edit')

    const [userData, setUserData] = useState(null);


    const handle_edit_click = () =>{
        // send user to edit profile page
        // when done, logout them out and send them back to ' login' or homepage

    }



    const handle_following_click = () =>{
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

                    // if login and is current user
                    // do not show the following button, but show edit
                    if (isLoggedIn === true && current_user_email === userEmail){
                        setShow_following_Button(false)
                        setShow_edit_button(true)
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

    }, [current_user_email, userEmail, isLoggedIn, show_following_Button, buttontext, show_edit_button, set_edit_Buttontext]);
    // notice line 45 use 'current_user_email' to trigger page re-render.
    // everytime current_user_email which come from url changed, the page will reload.

    if (!userData) {
        // render a loading spinner or placeholder content while waiting for data
        return <div>Loading...</div>
    }

    const { user_email, user_first_name, user_last_name, user_age } = userData;

    return (
        <div className="App123">
            <div className='User'>
                <button type='button' className='Back' onClick={()=>navigate("/")}>
                    <p4>Back</p4>
                    <br/></button>
                <div className= "following_post-author-link">
                    <img
                        className="following_post-avatar"
                        src = {`https://i.pravatar.cc/50?u=${user_first_name}`}
                        alt = {user_first_name}
                    />
                    <div className="following_post-author-info">
                        <span className="following_post-author">{user_first_name}</span>
                    </div>
                </div>

                {/*add another button on same position*/}
                { show_edit_button &&
                    <button type='button' className='following' onClick={handle_edit_click}  >
                        {edit_button_text}
                    </button>
                }

                { show_following_Button &&
                <button type='button' className='following' onClick={handle_following_click}  >
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

