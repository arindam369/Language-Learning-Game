// Login Section
import styles from "../styles/Home.module.css";

export default function Register({onLogin}){

    return (
        <>
            <div className={styles.loginContainer}>
                <h2>Register</h2>
                <div className={styles.loginInputBox}>
                    <input type="email" placeholder="Enter your name"/>
                    <input type="email" placeholder="Enter your email"/>
                    <input type="password" placeholder="Enter your password"/>

                    <button>Register</button>
                    <div className={styles.registerText}>Already have an account? <span onClick={onLogin}>Login</span></div>
                </div>
            </div>
        </>
    )
}