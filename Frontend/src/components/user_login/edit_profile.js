import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./user_login.css"
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Edit_profile = (props) => {
    const [old_pass, set_old_pass] = useState('');
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
        console.log("edit profile send data to backend")
        console.log("old password")
        console.log(old_pass)
        console.log("end of old password")
        console.log(pass);
        console.log(firstname);
        console.log(lastname)
        console.log(date)
        // sending the post request
        axios.post('handle_edit_profile.php', {

            user_old_password: old_pass,
            user_password: pass,
            user_first_name: firstname,
            user_last_name: lastname,
            user_date_of_birth: date
        })
            .then((response) => {
                console.log("this is the response data in edit profile")
                console.log(response.data)
                console.log("info status would be")
                console.log(response.data.info_status)

                const info_status = response.data.info_status



                // check response anc use pop up
                if (info_status === "old password is empty" ) {
                    toast.error("your old password is empty")
                }
                else if (info_status === "old password is incorrect"){
                    toast.error("your old password is incorrect")
                }
                else if (info_status === "success"){
                    // when success, send him back to homepage
                    toast.success("Info Updated", {
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
                toast.error("edit profile failed")
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
                    <h2>Edit Profile</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="firstname">First name</label>
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="your first name" id="first name" name="firstname" />

                        <label htmlFor="lastname">Last name</label>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="your last name" id="last name" name="lastname"/>

                        <label htmlFor="date">Date of Birth</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Enter BirthDate" id="date" name="birthdate" />

                        {/* user must enter old password to identify himself*/}
                        {/*Required Field !!! Must not be empty*/}
                        <label htmlFor="password">Old Password</label>
                        <input value={old_pass} onChange={(e) => set_old_pass(e.target.value)} type="password" placeholder="Enter old password to verify" id="password" name="password" required />

                        <label htmlFor="password">Password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter new password" id="password" name="password"/>

                        <button type="submit">Update your info</button>
                    </form>



                    <button className="link-btn" onClick={() => navigate("/login")}>Already have an account? Login here.</button>
                    <button type="button" onClick={goBack}>Back Home</button>

                </div>
            </div>
        </div>
    )
}