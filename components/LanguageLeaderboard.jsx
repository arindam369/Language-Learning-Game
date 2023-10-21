import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {FaTrophy} from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";

export default function LanguageLeaderboard({language}){
    const [scoreboard, setScoreboard] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        const generateLeaderboard = async ()=>{
            try{
                const response = await axios.get(`/api/language/${language}`);
                // console.log(response.data);
                setScoreboard(response.data);
            }catch(err){
                console.log(err);
            }
        }

        generateLeaderboard();
    }, []);

    return (
        <>
            <div className={styles.leaderboardContainer}>
                <div className={styles.trophyBox}><FaTrophy className={styles.trophyIcon}/>
                    <span>{language.replace(/^\w/, c => c.toUpperCase())} Leaderboard</span>
                </div>

                <div className={styles.leaderboards2}>
                    {scoreboard.length>0 && scoreboard.map((score)=>{
                        return (
                            <div className={styles.leaderboard} key={score._id} onClick={()=>{router.push(`/profile/${score.user}`)}}>
                                <div className={styles.quizLanguage}>{(score.language).replace(/^\w/, c =>c.toUpperCase())}</div>
                                <div className={styles.quizDifficulty}>{score.quantity} Questions</div>
                                <div className={score.difficulty==="easy"?"quizDifficulty easyColor":score.difficulty==="medium"?"quizDifficulty mediumColor":"quizDifficulty hardColor"}>{(score.difficulty).replace(/^\w/, c =>c.toUpperCase())}</div>
                                <div className={styles.quizResult}><b>Score:</b> {score.yourScore}/{score.totalScore}</div>
                                <div className={styles.quizScore}><b>Accuracy:</b> {((score.yourScore/score.totalScore)*100).toFixed(2)}%</div>
                                <div className={styles.quizScore}><b>Rating:</b> {((score.yourScore/score.totalScore)*5).toFixed(2)}</div>
                                <div><b>User: </b>{score.userId}</div>
                            </div>
                        )
                    })}
                    {scoreboard.length===0 && <div className={styles.noRecord}>No Record Found</div>}
                </div>
            </div>
        </>
    )
}