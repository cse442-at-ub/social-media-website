import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

function App() {
    // modify from Login to Register
    const [currentForm, setCurrentForm] = useState('Login');
    // const [nextForm, setNextForm] = useState('Register')


    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }


    return (
        <div className="App">
            {
                currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                // currentForm === "Register" ? <Register onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} />
            }
        </div>
    );
}

export default App;