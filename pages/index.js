import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Quiz from "@/components/Quiz";
import Instructions from "@/components/Instructions";

export default function IndexPage(){
  return (
    <>
      <Navbar/>
      <div className={styles.homeContainer}>
        <Quiz/>
        <Instructions/>
      </div>
    </>
  )
}