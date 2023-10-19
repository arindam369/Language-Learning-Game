import styles from "../styles/Home.module.css";

export default function Quiz(){
    return (
        <>
            <div className={styles.quizContainer}>
                <div className={styles.selectInputBox}>
                    <div className={styles.selectInput}>
                        <select>
                            <option value="" hidden>Select Language</option>
                            <option value="bengali">Bengali</option>
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                        </select>
                    </div>
                    <div className={styles.selectInput}>
                        <select>
                            <option value="" hidden>Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className={styles.selectInput}>
                        <select>
                            <option value="" hidden>Select Quantity</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                {/* <button>Start Quiz</button> */}
                <button>Login to Start Quiz</button>
            </div>
        </>
    )
}