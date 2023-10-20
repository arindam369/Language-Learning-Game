import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
    userId: "",
    userData: "",
    isAuthenticated: "",
    updateUserId: (id)=>{},
    updateUserData: (userData)=>{},
    updateAuthenticationStatus: (status)=>{}
});

export const AuthContextProvider = (props)=>{
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const updateUserId = (id)=>{
        setUserId(id);
    }
    const updateUserData = (userData)=>{
        setUserData(userData);
    }
    const updateAuthenticationStatus = (status)=>{
        setIsAuthenticated(status);
    }

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth');
                const data = response.data;
                console.log(data);

                if (data.user) {
                    setUserData(data.user);
                    setUserId(data.user._id);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setUserData(null);
                setUserId(null);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [])
    

    const authContext = {
        userId: userId,
        userData, userData,
        isAuthenticated: isAuthenticated,
        updateUserId: updateUserId,
        updateUserData: updateUserData,
        updateAuthenticationStatus: updateAuthenticationStatus
    }

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}

export default AuthContext;