import styles from "../styles/Home.module.css";
import {FaTrophy} from "react-icons/fa";

export default function Leaderboard(){
    return (
        <>
            <div className={styles.leaderboardContainer}>
                <div className={styles.trophyBox}><FaTrophy className={styles.trophyIcon}/>
                    <span>Leaderboard</span>
                </div>

                <div className={styles.leaderboards}>
                    <div className={styles.leaderboard}>
                        <div className={styles.quizLanguage}>Bengali</div>
                        <div className={styles.quizDifficulty1}>Easy</div>
                        <div className={styles.quizResult}>13/15</div>
                        <div className={styles.quizScore}>350/400</div>
                    </div>
                    <div className={styles.leaderboard}>
                        <div className={styles.quizLanguage}>Bengali</div>
                        <div className={styles.quizDifficulty1}>Easy</div>
                        <div className={styles.quizResult}>13/15</div>
                        <div className={styles.quizScore}>350/400</div>
                    </div>
                    <div className={styles.leaderboard}>
                        <div className={styles.quizLanguage}>Bengali</div>
                        <div className={styles.quizDifficulty1}>Easy</div>
                        <div className={styles.quizResult}>13/15</div>
                        <div className={styles.quizScore}>350/400</div>
                    </div>
                    <div className={styles.leaderboard}>
                        <div className={styles.quizLanguage}>Bengali</div>
                        <div className={styles.quizDifficulty2}>Medium</div>
                        <div className={styles.quizResult}>13/15</div>
                        <div className={styles.quizScore}>350/400</div>
                    </div>
                    <div className={styles.leaderboard}>
                        <div className={styles.quizLanguage}>Bengali</div>
                        <div className={styles.quizDifficulty3}>Hard</div>
                        <div className={styles.quizResult}>13/15</div>
                        <div className={styles.quizScore}>350/400</div>
                    </div>
                </div>
            </div>
        </>
    )
}