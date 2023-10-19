import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Profile(){
    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.profileLeft}>
                    <Image src={"/profile.png"} width={300} height={300} alt="profile" className={styles.profileDp}/>
                </div>
                <div className={styles.profileRight}>
                    <span className={styles.authorName}>Arindam Halder</span>
                    <span className={styles.authorId}>halderarindam10000</span>
                </div>
            </div>
        </>
    )
}