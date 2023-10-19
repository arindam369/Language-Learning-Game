import styles from "../styles/Home.module.css";

export default function Instructions(){
    return (
        <>
            <div className={styles.instructionsContainer}>
                <h2>Rules & Regulations</h2>
                <ul>
                    <li>Users are required to create and <b>log in</b> to personal accounts to access the game, ensuring a personalized learning experience.</li>
                    <li>Prior to beginning the quiz, users can select their preferred language, difficulty level, and choose the quantity of questions they wish to attempt.</li>
                    <li>The quiz starts with easy questions and gradually increases in difficulty, tailoring the learning experience to the user's proficiency level.</li>
                    <li>Users earn <b>points</b> for correct answers, while the difficulty of subsequent questions adjusts based on their <b>score</b>, ensuring a challenging yet manageable experience.</li>
                    <li>User scores are recorded in individual profiles and showcased on the <b>leaderboard</b>, allowing users to monitor their <b>progress</b> and compete with others.</li>
                    <li>To maintain integrity, users are prohibited from cheating or using external aids. Additionally, user data is handled in compliance with privacy policies, ensuring confidentiality and security.</li>
                </ul>
            </div>
        </>
    )
}