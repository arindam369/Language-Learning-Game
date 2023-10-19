// Login Section
import styles from "../styles/Home.module.css";

export default function Login({onRegister}){

    return (
        <>
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <div className={styles.loginInputBox}>
                    <input type="email" placeholder="Enter your email"/>
                    <input type="password" placeholder="Enter your password"/>

                    <button>Login</button>
                    <div className={styles.registerText}>Don't have an account? <span onClick={onRegister}>Register</span></div>
                </div>
            </div>
        </>
    )
}