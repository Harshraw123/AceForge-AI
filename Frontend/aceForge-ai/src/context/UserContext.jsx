import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPath';

export const UserContext = createContext({
    user: null,
    loading: false,
    isAuthenticated: false,
    updateUser: () => {},
    clearUser: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true while checking auth

    const updateUser = (userData) => {
        // Make sure we save to both state and localStorage
        if (userData && userData.token) {
            localStorage.setItem("token", userData.token);
        }
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            clearUser();
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            try {
                // Make sure axiosInstance has the token from localStorage
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        updateUser,
        clearUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
