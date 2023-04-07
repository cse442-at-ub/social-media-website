import React, { useState } from "react";
import axios from 'axios';
import "./user_login.css"


import {useNavigate} from "react-router-dom"


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // new state variable for error message
    const navigate = useNavigate();

    function goBack(){
        navigate("/")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("here is input data sending to backend")
        console.log(pass)
        console.log(email);
        console.log("end of input data")
        // sending the post request
        axios.post('handle_login.php', {
            user_email: email,
            user_password: pass
        })
            .then((response) => {
                console.log("response.data from server")
                console.log(response.data)
                const { status, token } = response.data;

                console.log("following is the status and token")
                console.log(status)
                console.log(token)

                if (status === 'success'){
                    console.log("this is the data part in the response")
                    console.log(response.data)
                    navigate('/')
                }
                else if (status === 'invalid user password'){
                    setErrorMessage('The password is not correct'); // set the error message
                }
                else if (status === 'invalid user email'){
                    setErrorMessage('User email is incorrect'); // set the error message
                }
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <div className="user_login">
            <div className="auth-form-container">
                <h1>Welcome to chat union</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                    <button type="submit">Log In</button>
                </form>

                {/* conditional rendering of error message */}
                {errorMessage &&
                    <div className="popup">
                        <div className="popup-inner">
                            <p>{errorMessage}</p>
                            <button onClick={() => setErrorMessage('')}>OK</button>
                        </div>
                    </div>
                }

                <button className="link-btn" onClick={()=>navigate("/register")}>Don't have an account? Register here.</button>
                <button type="button" onClick={goBack}>Back Home</button>
            </div>
        </div>
    )
}
