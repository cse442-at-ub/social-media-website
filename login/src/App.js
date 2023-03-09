import React, { useState } from "react";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

// blow is for the using navigate
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
    // // modify from Login to Register
    // const [currentForm, setCurrentForm] = useState('Login');
    // // const [nextForm, setNextForm] = useState('Register')
    //
    //
    // const toggleForm = (formName) => {
    //     setCurrentForm(formName);
    // }


    return (
        <div className="App">
            {

                <>

                    <BrowserRouter>

                        <Routes>

                            <Route exact path="/" element={<Login/>}/>

                            <Route exact path="/register" element={<Register/>}/>

                        </Routes>

                    </BrowserRouter>

                </>

                // <Login></Login>
                // <Test></Test>
                // currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />

            }
        </div>
    );
}

export default App;