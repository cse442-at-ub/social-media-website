import React, { useState } from "react";
import './App.css';
import { Login } from "./components/user_login/Login";
import { Register } from "./components/user_login/Register";
import { Edit_profile } from "./components/user_login/edit_profile"


// blow is for the using navigate
import { Routes, Route, HashRouter} from "react-router-dom";
import LeftColumn from "./components/homepage/LeftColumn";
import MiddleColumn from "./components/homepage/MiddleColumn";
import RightColumn from "./components/homepage/RightColumn";
import Userpage from "./components/userpage/Userpage";

import Followers from "./components/userpage/Followers";
import Following from "./components/userpage/Following";
import Blogs from "./components/userpage/Blogs";
import Album from "./components/userpage/Album";
import Email from "./components/userpage/Email";



function App() {
    // // modify from Login to Register
    // const [currentForm, setCurrentForm] = useState('Login');
    // // const [nextForm, setNextForm] = useState('Register')
    //
    //
    // const toggleForm = (formName) => {
    //     setCurrentForm(formName);
    // }

    const leftButtons = ["Home", "Profile", //"Messages", 
     "Post"];

    return (
        <div className="App">
            {

                <HashRouter>
                    <Routes>

                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/register" element={<Register/>}/>




                        {/* homepage */}
                        <Route exact path="/" element={
                        <div className={"homepage"}    >

                                    <LeftColumn  buttons={leftButtons} />
                                    <MiddleColumn />
                                    <RightColumn />

                        </div>
                        }/>

                        {/* userpage */}
                        <Route exact path="/userpage/:current_user_email" element={<Email />}/>
                        <Route exact path="/Followers/:current_user_email" element={<Followers/>}/>
                        <Route exact path="/Following/:current_user_email" element={<Following/>}/>
                        <Route exact path="/Blogs/:current_user_email" element={<Blogs/>}/>
                        <Route exact path="/Album/:current_user_email" element={<Album/>}/>
                        {/* edit profile test */}
                        <Route exact path="/edit_profile" element={<Edit_profile/>}/>




                    </Routes>
                </HashRouter>

            }
        </div>
    );
}

export default App;