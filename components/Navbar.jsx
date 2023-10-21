// Navbar section
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/store/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const logout = async ()=>{
    await axios.get(`/api/logout/${authCtx.userId}`).then(()=>{
      toast.success("Logged out successfully");
      authCtx.updateUserId(null);
      authCtx.updateUserData(null);
      authCtx.updateAuthenticationStatus(false);
    }).catch((err)=>{
      console.log(err);
    });
  }

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.leftPart}>
          <Link href={"/"} className={styles.navLogoName}>
            <b className={styles.navLogoColor}>Language </b>Learning
          </Link>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.navBullets}>
            <Link
              href={"/leaderboard"}
              className={
                router.pathname === "/leaderboard" ? "selectedNavBullet" : "navBullet"
              }
            >
              Leaderboard
            </Link>
            <Link
              href={"/dashboard"}
              className={
                router.pathname === "/dashboard" ? "selectedNavBullet" : "navBullet"
              }
            >
              Dashboard
            </Link>

            {!authCtx.isAuthenticated && <Link
              href={"/login"}
              className={
                router.pathname === "/login"
                  ? "selectedNavBullet"
                  : "navBullet"
              }
            >
              Login
            </Link>}
            {authCtx.isAuthenticated && <div className="navBullet" onClick={logout}>Logout</div>}
          </div>
        </div>
      </div>
    </>
  );
}
