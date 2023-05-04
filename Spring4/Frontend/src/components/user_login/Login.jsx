import React, { useState } from "react";
import axios from 'axios';
import "./user_login.css"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import {useNavigate} from "react-router-dom"


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
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

                if (status === 'success'){
                    console.log("this is the data part in the response")
                    console.log(response.data)


                    // when success, send him back to homepage
                    toast.success("Login success", {
                        autoClose: 1000, // Display duration in milliseconds (e.g., 3000 ms = 3 seconds)
                    });
                    toast.success("redirect to Homepage.....", {
                        autoClose: 1000, // Display duration in milliseconds (e.g., 3000 ms = 3 seconds)
                    });

                    setTimeout(() => {
                        navigate("/");
                    }, 2000); // Adjust the delay time (in milliseconds) as needed
                }

                else if (status === 'invalid user password'){
                    toast.error("your password is incorrect")
                    // window.alert("invalid user password")
                }
                else if (status === 'invalid user email'){
                    toast.error("your email is incorrect")
                }
            }, (error) => {
                console.log(error);
                toast.error("login failed")
            });
    }

    return (
        <div>
            <ToastContainer
                position="top-center"
                reverseOrder={false}
            />
            <div className="user_login">
                <div className="auth-form-container">
                    <h1>Welcome to chat union</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                        <label htmlFor="password">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />

                        <button type="submit">Log In</button>
                    </form>

                    <button className="link-btn" onClick={()=>navigate("/register")}>Don't have an account? Register here.</button>
                    <button type="button" onClick={goBack}>Back Home</button>
                </div>
            </div>
        </div>
    );
}
