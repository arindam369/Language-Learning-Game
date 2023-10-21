import styles from "../styles/Home.module.css";
import {FaTrophy} from "react-icons/fa";

export default function PublicLeaderboard({scoreboard}){

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
                            </div>
                        )
                    })}
                    {scoreboard.length===0 && <div className={styles.noRecord}>No Score Found</div>}
                </div>
            </div>
        </>
    )
}