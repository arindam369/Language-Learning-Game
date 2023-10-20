import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Profile from "@/components/Profile";
import Leaderboard from "@/components/Leaderboard";
import ProtectedRoute from "@/hoc/ProtectedRoute";

function DashboardPage() {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <Profile/>
        <Leaderboard />
      </div>
    </>
  );
}

export default ProtectedRoute(DashboardPage);
