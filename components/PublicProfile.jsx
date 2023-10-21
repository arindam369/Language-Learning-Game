import { useContext } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import AuthContext from "@/store/AuthContext";

export default function PublicProfile({userData}){
    const authCtx = useContext(AuthContext);

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileLeft}>
                    <Image src={"/profile.png"} width={300} height={300} alt="profile" className={styles.profileDp}/>
                </div>
                <div className={styles.profileRight}>
                    <span className={styles.authorName}>{userData.name}</span>
                    <span className={styles.authorId}>{userData.email}</span>
                    <span className={styles.authorId}>{userData._id}</span>
                </div>
            </div>
        </>
    )
}