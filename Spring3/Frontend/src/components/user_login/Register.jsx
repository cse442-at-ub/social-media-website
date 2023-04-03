import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./user_login.css"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    // add additional field for more information
    const [age, setAge] = useState('')
    const navigate = useNavigate();

    function goBack(){
        navigate("/")

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(pass);
        console.log(name);
        console.log(age)
        // sending the post request
        axios.post('handle_register.php', {

            user_email: email,
            user_password: pass,
            user_full_name: name,
            user_age : age
        })
            .then((response) => {
                console.log("this is the response itself")
                console.log(response);
                console.log("this is the data part in the response")
                console.log(response.data)
                console.log("this is the type of data")
                console.log(typeof response.data)
            }, (error) => {
                console.log(error);
            });

    }



    return (
        <div className="user_login">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" id="name" name="name" />

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

                {/*<button onClick={()=>navigate(-1)}>Go Back Home</button>*/}
            </div>
        </div>
    )
}