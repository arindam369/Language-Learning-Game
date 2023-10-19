import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
import Leaderboard from "@/components/Leaderboard";

export default function DashboardPage(){
    return (
        <>
            <Navbar/>
            <div className={styles.dashboardContainer}>
                <Profile/>
                <Leaderboard/>
            </div>
        </>
    )
}