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
    const [date, setDate] = useState('')
    // added for route
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
        console.log("added date of birth ")
        console.log(date)
        console.log("end of input data")
        // sending the post request
        axios.post('handle_register.php', {

            user_email: email,
            user_password: pass,
            user_first_name: firstname,
            user_last_name: lastname,
            user_date_of_birth: date
        })
            .then((response) => {
                console.log("this is the response data")
                console.log(response.data)

                const {  repeated_email } = response.data;
                console.log("here is the repeated email")
                console.log(repeated_email)

                if (repeated_email === true){
                    toast.error("Email repeated, please choose another email")
                }
                else{

                    // when success, send him back to homepage
                    toast.success("Register success", {
                        autoClose: 1000, // Display duration in milliseconds (e.g., 3000 ms = 3 seconds)
                    });
                    toast.success("redirect to login.....", {
                        autoClose: 1000, // Display duration in milliseconds (e.g., 3000 ms = 3 seconds)
                    });

                    setTimeout(() => {
                        navigate("/login");
                    }, 2000); // Adjust the delay time (in milliseconds) as needed

                }

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
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="your first name" id="first name" name="firstname" required />
                        <label htmlFor="lastname">Last name</label>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="your last name" id="last name" name="lastname" required />

                        {/*added date of birth */}
                        <label htmlFor="date">Date of Birth</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Enter BirthDate" id="date" name="birthdate" required />

                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
                        <label htmlFor="password">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                        <button type="submit">Register your account</button>
                    </form>



                    <button className="link-btn" onClick={() => navigate("/login")}>Already have an account? Login here.</button>
                    <button type="button" onClick={goBack}>Back Home</button>

                </div>
            </div>
        </div>
    )
}