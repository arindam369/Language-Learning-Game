// Navbar section
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

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
              href={"/dashboard"}
              className={
                router.pathname === "/dashboard" ? "selectedNavBullet" : "navBullet"
              }
            >
              Dashboard
            </Link>

            <Link
              href={"/login"}
              className={
                router.pathname === "/login"
                  ? "selectedNavBullet"
                  : "navBullet"
              }
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
