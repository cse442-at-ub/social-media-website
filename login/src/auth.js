import React, { useState, useEffect } from 'react';
import axios from 'axios';

const checkSession = async () => {
    try {
        const response = await axios.get('/check_cookie.php');
        const data = response.data;

        if (data.isLoggedIn) {
            return { isLoggedIn: true, user: data.user };
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
        const [user, setUser] = useState(null);

        useEffect(() => {
            const fetchSession = async () => {
                const sessionInfo = await checkSession();
                setIsLoggedIn(sessionInfo.isLoggedIn);
                setUser(sessionInfo.user);
            };

            fetchSession();
        }, []);

        return (
            <WrappedComponent
                {...props}
                isLoggedIn={isLoggedIn}
                user={user}
            />
        );
    };
};

export default withAuth;