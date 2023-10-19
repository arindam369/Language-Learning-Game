import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Register from "@/components/Register";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function LoginPage() {
  const [visibleLogin, setVisibleLogin] = useState(true);
    const toggleLogin = ()=>{
        setVisibleLogin(!visibleLogin);
    }

  return (
    <>
      <Navbar />
      <div className={styles.homeContainer}>
        {visibleLogin && <Login onRegister={toggleLogin}/>}
        {!visibleLogin && <Register onLogin={toggleLogin}/>}
      </div>
    </>
  );
}
