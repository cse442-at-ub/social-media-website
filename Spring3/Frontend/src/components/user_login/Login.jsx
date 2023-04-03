import React, { useState } from "react";
import axios from 'axios';
import "./user_login.css"


import {useNavigate} from "react-router-dom"


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // changed

    const navigate = useNavigate();

    function goBack(){
        navigate("/")

    }




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(pass)
        console.log(email);
        // sending the post request
        axios.post('handle_login.php', {

            user_email: email,
            user_password: pass
        })
            .then((response) => {
                console.log("this is the data part in the response")
                console.log(response.data)

                const content = response.data
                if (content.includes("user found")){
                    navigate("/")
                }
                else if (content.includes("invalid user password")){
                    console.log("the password is not correct")

                }
                else if (content.includes("invalid user email")){
                    console.log("user email is incorrect")
                }

                // console.log("this is the response itself")
                // console.log(response);
                // console.log("this is the data part in the response")
                // console.log(response.data)
                // console.log("this is the type of data")
                // console.log(typeof response.data)
                // console.log("this is the response type")
                // console.log(typeof (response))

            }, (error) => {
                console.log(error);
            });



    }




    return (
    <div className="user_login">
        <div className="auth-form-container">
            <h1>Welcome to chat union</h1>
            {/*<h2>Login</h2>*/}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                <button type="submit">Log In</button>

            </form>
            <button className="link-btn" onClick={()=>navigate("/register")}>Don't have an account? Register here.</button>
            <button type="button" onClick={goBack}>Back Home</button>


            {/*<button onClick={()=>navigate("/")}>About</button>*/}


        </div>
    </div>
    )
}