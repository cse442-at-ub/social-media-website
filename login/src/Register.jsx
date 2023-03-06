import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    // add additional field for more information
    const [age, setAge] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(name)
    }

    const navigate = useNavigate();

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
                <label htmlFor="age">Age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)}type="age" placeholder="18" id="age" name="age" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Register your account</button>
            </form>
            <button className="link-btn" onClick={() => navigate("/")}>Already have an account? Login here.</button>

            {/*<button onClick={()=>navigate(-1)}>Go Back Home</button>*/}
        </div>
    )
}