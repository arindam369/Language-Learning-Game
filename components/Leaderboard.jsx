import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {FaTrophy} from "react-icons/fa";
import axios from "axios";
import AuthContext from "@/store/AuthContext";
import {AiFillDelete} from "react-icons/ai";
import toast from "react-hot-toast";
import { confirmDialog } from "primereact/confirmdialog";

export default function Leaderboard(){
    const authCtx = useContext(AuthContext);

    const [scoreboard, setScoreboard] = useState([]);
    const generateLeaderboard = async ()=>{
        const scores = await axios.get(`/api/scores/${authCtx.userId}`);
        setScoreboard(scores.data);
    }
    useEffect(()=>{
        generateLeaderboard();
    }, [])

    const deleteScore = (id)=>{
        axios.delete(`/api/scores/${id}`).then(()=>{
            toast.success("Score removed successfully");
            generateLeaderboard();
        }).catch((err)=>{
            console.log(err);
        })
    }

    const confirmDelete = (id)=>{
        confirmDialog({
            message: "Are you sure you want to delete this score?",
            header: "Delete Score",
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteScore(id),
            reject: () => {},
          });
    }

    return (
        <>
            <div className={styles.leaderboardContainer}>
                <div className={styles.trophyBox}><FaTrophy className={styles.trophyIcon}/>
                    <span>Scoreboard</span>
                </div>

                <div className={styles.leaderboards}>
                    {scoreboard.length>0 && scoreboard.map((score)=>{
                        return (
                            <div className={styles.leaderboard} key={score._id}>
                                <div className={styles.quizLanguage}>{(score.language).replace(/^\w/, c =>c.toUpperCase())}</div>
                                <div className={styles.quizDifficulty}>{score.quantity} Questions</div>
                                <div className={score.difficulty==="easy"?"quizDifficulty easyColor":score.difficulty==="medium"?"quizDifficulty mediumColor":"quizDifficulty hardColor"}>{(score.difficulty).replace(/^\w/, c =>c.toUpperCase())}</div>
                                <div className={styles.quizResult}><b>Score:</b> {score.yourScore}/{score.totalScore}</div>
                                <div className={styles.quizScore}><b>Accuracy:</b> {((score.yourScore/score.totalScore)*100).toFixed(2)}%</div>
                                <div className={styles.quizScore}><b>Rating:</b> {((score.yourScore/score.totalScore)*5).toFixed(2)}</div>
                                <AiFillDelete className={styles.deleteIcon} onClick={()=>{confirmDelete(score._id)}}/>
                            </div>
                        )
                    })}
                    {scoreboard.length===0 && <div className={styles.noRecord}>No Score Found</div>}
                </div>
            </div>
        </>
    )
}