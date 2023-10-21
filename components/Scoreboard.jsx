import { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import AuthContext from "@/store/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Scoreboard({onGenerateEasy, onGenerateMedium, onGenerateHard, shouldGoNext}) {
  const authCtx = useContext(AuthContext);

  const goNext = ()=>{
    const accuracy = (authCtx.totalScore===0 ? 0 : (authCtx.yourScore/authCtx.totalScore)*100);
    if(+authCtx.questionsSolved < +authCtx.quantity-1){
      if(+authCtx.questionsSolved >= 2){
          if(+accuracy >= 80){
            console.log("Hard called");
            onGenerateHard();
          }
          else if(+accuracy >= 55){
            console.log("Medium called");
            onGenerateMedium();
          }
          else{
            console.log("Easy called");
            onGenerateEasy();
          }
      }
      else{
          if(authCtx.difficulty === "easy"){
            onGenerateEasy();
          }
          else if(authCtx.difficulty === "medium"){
            onGenerateMedium();
          }
          else{
            onGenerateHard();
          }
      }
    }
    if(+authCtx.questionsSolved < +authCtx.quantity){
      authCtx.updateQuestionsSolved(+authCtx.questionsSolved + 1);
    }
  }

  const saveRecord = ()=>{
    axios.post(`/api/scores/${authCtx.userId}`, {
      language: authCtx.language,
      difficulty: authCtx.difficulty,
      quantity: authCtx.quantity,
      yourScore: authCtx.yourScore,
      totalScore: authCtx.totalScore,
      accuracy: authCtx.accuracy,
      rating: authCtx.rating}).then((response)=>{
        toast.success("Record saved successfully");
      }).catch((err)=>{
        console.log(err);
      })
  }

  useEffect(()=>{
    if(shouldGoNext != null){
      goNext();
    }
  }, [shouldGoNext])
  
  return (
    <>
      <div className={styles.scoreboardContainer}>
        <div className={styles.questionNo}>
          <span className={styles.label}>Questions Solved:</span>
          <span className={styles.ans}>{authCtx.questionsSolved}/{authCtx.quantity}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.label}>Your Score:</span>
          <span className={styles.ans}>{authCtx.yourScore}/{authCtx.totalScore}</span>
        </div>
        <div className={styles.accuracy}>
          <span className={styles.label}>Test Accuracy:</span>
          <span className={styles.ans}>{authCtx.totalScore > 0 ? ((authCtx.yourScore/authCtx.totalScore)*100).toFixed(2) : 0}%</span>
        </div>
        <div className={styles.rating}>
            <div className={styles.rateValue}>{authCtx.totalScore > 0 ? ((authCtx.yourScore/authCtx.totalScore)*5).toFixed(2) : 0}</div>
        </div>
      </div>
      {/* <div className={styles.nextButton} onClick={goNext}>Next</div> */}
      {+authCtx.questionsSolved===+authCtx.quantity && <div className={styles.nextButton} onClick={saveRecord}>Save Record</div>}
    </>
  );
}
