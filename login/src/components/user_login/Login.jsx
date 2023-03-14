import React, { useState } from "react";
import axios from 'axios';
import "./user_login.css"


import {useNavigate} from "react-router-dom"


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // changed


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(pass)
        console.log(email);
        // sending the post request
        axios.post('http://localhost:3000/login', {

            user_email: email,
            user_password: pass
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });



    }



    const navigate = useNavigate();

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

            {/*<button onClick={()=>navigate("/")}>About</button>*/}


        </div>
    </div>
    )
}