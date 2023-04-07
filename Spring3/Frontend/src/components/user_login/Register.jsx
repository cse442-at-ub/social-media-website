import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./user_login.css"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // add additional field for more information
    const [age, setAge] = useState('')
    const navigate = useNavigate();

    function goBack(){
        navigate("/")

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("here is input data sending to backend")
        console.log(email)
        console.log(pass);
        console.log(firstname);
        console.log(lastname)
        console.log(age)
        console.log("end of input data")
        // sending the post request
        axios.post('handle_register.php', {

            user_email: email,
            user_password: pass,
            user_first_name: firstname,
            user_last_name: lastname,
            user_age : age
        })
            .then((response) => {
                console.log("this is the response itself")
                console.log(response);
                toast.success("register success")

            }, (error) => {
                console.log(error);
                toast.error("register failed")
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
                    <h2>Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="firstname">First name</label>
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="your first name" id="first name" name="firstname" />
                        <label htmlFor="lastname">Last name</label>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="your last name" id="last name" name="lastname" />


                        <label htmlFor="age">Age</label>
                        <input value={age} onChange={(e) => setAge(e.target.value)}type="number" placeholder="18" id="age" name="age" />
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button type="submit">Register your account</button>
                    </form>
                    <button className="link-btn" onClick={() => navigate("/login")}>Already have an account? Login here.</button>
                    <button type="button" onClick={goBack}>Back Home</button>

                </div>
            </div>
        </div>
    )
}