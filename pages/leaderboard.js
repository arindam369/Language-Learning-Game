import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import LanguageLeaderboard from "@/components/LanguageLeaderboard";

export default function LeaderboardPage(){
    return (
        <>
            <Navbar />
            <div className={styles.dashboardContainer}>
                <LanguageLeaderboard language={"c++"}/>
                <LanguageLeaderboard language={"java"}/>
                <LanguageLeaderboard language={"python"}/>
                <LanguageLeaderboard language={"javascript"}/>
            </div>
        </>
    )
}