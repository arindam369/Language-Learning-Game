import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
    userId: "",
    userData: "",
    isAuthenticated: "",
    language: "",
    difficulty: "",
    quantity: "",
    accuracy: "",
    questionsSolved: "",
    yourScore: "",
    totalScore: "",
    easyIndex: "",
    mediumIndex: "",
    hardIndex: "",
    updateUserId: (id)=>{},
    updateUserData: (userData)=>{},
    updateAuthenticationStatus: (status)=>{},
    updateLanguage: (language)=>{},
    updateDifficulty: (difficulty)=>{},
    updateQuantity: (quantity)=>{},
    updateAccuracy: (accuracy)=>{},
    updateQuestionsSolved: (questionsSolved)=>{},
    updateYourScore: (score)=>{},
    updateTotalScore: (score)=>{},
    updateEasyIndex: (index)=>{},
    updateMediumIndex: (index)=>{},
    updateHardIndex: (index)=>{},
});

export const AuthContextProvider = (props)=>{
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [questionsSolved, setQuestionsSolved] = useState(0);
    const [yourScore, setYourScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [easyIndex, setEasyIndex] = useState(0);
    const [mediumIndex, setMediumIndex] = useState(0);
    const [hardIndex, setHardIndex] = useState(0);
    
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

    const updateLanguage = (language)=>{
        setLanguage(language);
    }
    const updateDifficulty = (difficulty)=>{
        setDifficulty(difficulty);
    }
    const updateQuantity = (quantity)=>{
        setQuantity(quantity);
    }
    const updateAccuracy = (accuracy)=>{
        setAccuracy(accuracy);
    }
    const updateQuestionsSolved = (questionsSolved)=>{
        setQuestionsSolved(questionsSolved);
    }
    const updateYourScore = (score)=>{
        setYourScore(score);
    }
    const updateTotalScore = (score)=>{
        setTotalScore(score);
    }
    const updateEasyIndex = (index)=>{
        setEasyIndex(index);
    }
    const updateMediumIndex = (index)=>{
        setMediumIndex(index);
    }
    const updateHardIndex = (index)=>{
        setHardIndex(index);
    }
    

    const authContext = {
        userId: userId,
        userData, userData,
        isAuthenticated: isAuthenticated,
        language: language,
        difficulty: difficulty,
        quantity: quantity,
        accuracy: accuracy,
        questionsSolved: questionsSolved,
        yourScore: yourScore,
        totalScore: totalScore,
        easyIndex: easyIndex,
        mediumIndex: mediumIndex,
        hardIndex: hardIndex,
        updateUserId: updateUserId,
        updateUserData: updateUserData,
        updateAuthenticationStatus: updateAuthenticationStatus,
        updateLanguage: updateLanguage,
        updateDifficulty: updateDifficulty,
        updateQuantity: updateQuantity,
        updateAccuracy: updateAccuracy,
        updateQuestionsSolved: updateQuestionsSolved,
        updateYourScore: updateYourScore,
        updateTotalScore: updateTotalScore,
        updateEasyIndex: updateEasyIndex,
        updateMediumIndex: updateMediumIndex,
        updateHardIndex: updateHardIndex
    }

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}

export default AuthContext;