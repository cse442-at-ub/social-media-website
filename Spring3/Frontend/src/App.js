import React, { useState } from "react";
import './App.css';
import { Login } from "./components/user_login/Login";
import { Register } from "./components/user_login/Register";

// blow is for the using navigate
import { Routes, Route, HashRouter} from "react-router-dom";
import LeftColumn from "./components/homepage/LeftColumn";
import MiddleColumn from "./components/homepage/MiddleColumn";
import RightColumn from "./components/homepage/RightColumn";

import Userpage from "./components/userpage/Userpage"


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

                // <div>
                //     <LeftColumn buttons={leftButtons} />
                //     <MiddleColumn />
                //     <RightColumn />
                // </div>
                <HashRouter>
                    <Routes>

                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/register" element={<Register/>}/>

                        <Route exact path="/Fans" element={<Fans/>}/>
                        <Route exact path="/Following" element={<Following/>}/>
                        <Route exact path="/Blogs" element={<Blogs/>}/>

                        <Route exact path="/Album" element={<Album/>}/>



                        <Route exact path="/" element={
                        <div className={"homepage"}    >

                                    <LeftColumn/>
                                    <MiddleColumn />
                                    <RightColumn />

                        </div>
                        }/>

                        <Route exact path="/userpage" element={<Userpage/>}/>

                    </Routes>
                </HashRouter>

            }
        </div>
    );
}

export default App;