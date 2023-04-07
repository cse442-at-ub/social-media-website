import React, { useState, useEffect } from 'react';
import axios from 'axios';

const checkSession = async () => {
    try {
        const response = await axios.get('/handle_auth.php');
        const data = response.data;

        if (data.cookie_is_set) {
            return { isLoggedIn: true, userFirstName: data.user_first_name, userEmail: data.user_email, userLastName: data.user_last_name, userAge: data.user_age, userFullName: data.user_full_name};
        } else {
            return { isLoggedIn: false };
        }
    } catch (error) {
        console.error('Error checking session:', error);
        return { isLoggedIn: false };
    }
};

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userFullName, setUserFullName] = useState(null);
        const [userFirstName, setUserFirstName] = useState(null)
        const [userLastName, setUserLastName] = useState(null)
        const [userEmail, setUserEmail] = useState(null)
        const [userAge, setUserAge] = useState(null)

        useEffect(() => {
            const fetchSession = async () => {
                const sessionInfo = await checkSession();
                setIsLoggedIn(sessionInfo.isLoggedIn);
                setUserFullName(sessionInfo.userFullName);
                setUserFirstName(sessionInfo.userFirstName);
                setUserLastName(sessionInfo.userLastName);
                setUserEmail(sessionInfo.userEmail);
                setUserAge(sessionInfo.userAge);
            };

            fetchSession();
        }, []);

        return (
            <WrappedComponent
                {...props}
                isLoggedIn={isLoggedIn}
                userFullName={userFullName}
                userLastName={userLastName}
                userEmail={userEmail}
                userAge={userAge}
                userFirstName={userFirstName}
            />
        );
    };
};

export default withAuth;