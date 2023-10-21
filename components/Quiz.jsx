import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useContext, useState } from "react";
import AuthContext from "@/store/AuthContext";
import toast from "react-hot-toast";

export default function Quiz({onQuiz}){
    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const [language, setLanguage] = useState("");
    const [difficulty, setDifficullty] = useState("");
    const [quantity, setQuantity] = useState("");

    const goToLogin = ()=>{
        router.push("/login");
    }

    const startQuiz = ()=>{
        if(language.trim().length === 0 || difficulty.trim().length === 0 || quantity.trim().length === 0){
            toast.error("All fields are mandatory");
            return;
        }
        
        authCtx.updateLanguage(language);
        authCtx.updateDifficulty(difficulty);
        authCtx.updateQuantity(quantity);
        authCtx.updateAccuracy(0);
        authCtx.updateQuestionsSolved(0);
        authCtx.updateYourScore(0);
        authCtx.updateTotalScore(0);
        authCtx.updateEasyIndex(0);
        authCtx.updateMediumIndex(0);
        authCtx.updateHardIndex(0);
        onQuiz(language, difficulty, quantity);
    }

    return (
        <>
            <div className={styles.quizContainer}>
                <div className={styles.selectInputBox}>
                    <div className={styles.selectInput}>
                        <select value={language} onChange={(e)=>{setLanguage(e.target.value)}}>
                            <option value="" hidden>Select Language</option>
                            <option value="bengali">Bengali</option>
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                        </select>
                    </div>
                    <div className={styles.selectInput}>
                        <select value={difficulty} onChange={(e)=>{setDifficullty(e.target.value)}}>
                            <option value="" hidden>Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className={styles.selectInput}>
                        <select value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}>
                            <option value="" hidden>Select Quantity</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                {authCtx.isAuthenticated && <button onClick={startQuiz}>Start Quiz</button>}
                {!authCtx.isAuthenticated && <button onClick={goToLogin}>Login to Start Quiz</button>}
            </div>
        </>
    )
}