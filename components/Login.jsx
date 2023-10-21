// Login Section
import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import AuthContext from "@/store/AuthContext";

export default function Login({onRegister}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const login = async () => {
        if (email.trim().length === 0 || password.trim().length === 0) {
        toast.error("All fields are mandatory");
        return;
        }

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const isEmailValid = emailRegex.test(email);
        if(!isEmailValid){
            toast.error("Invalid email input");
            return;
        }

        // logging in database
        try{
            axios.post("/api/login", {email, password}).then((response)=>{
                toast.success("Logged in successfully");
                const data = response.data;
                authCtx.updateAuthenticationStatus(true);
                authCtx.updateUserData(data);
                authCtx.updateUserId(data._id);
                
                router.push("/dashboard");
            });
            // console.log(response.data);
            // const token = response.data;
            // Cookies.set('languageGame', token, { expires: 1 });
        }
        catch(err){
            console.log(err);
            toast.error(err);
        }
    };

    return (
        <>
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <div className={styles.loginInputBox}>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                    <button onClick={login}>Login</button>
                    <div className={styles.registerText}>Don't have an account? <span onClick={onRegister}>Register</span></div>
                </div>
            </div>
        </>
    )
}