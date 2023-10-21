import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import AuthContext from "@/store/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import RankTable from "./RankTable";

export default function Scoreboard({onGenerateEasy, onGenerateMedium, onGenerateHard, shouldGoNext}) {
  const authCtx = useContext(AuthContext);
  const [generateSignal, setGenerateSignal] = useState(false);

  const goNext = ()=>{
    const accuracy = (authCtx.totalScore===0 ? 0 : (authCtx.yourScore/authCtx.totalScore)*100);
    if(+authCtx.questionsSolved < +authCtx.quantity-1){
      if(+authCtx.questionsSolved >= 2){
          if(+accuracy >= 80){
            onGenerateHard(authCtx.language);
          }
          else if(+accuracy >= 55){
            onGenerateMedium(authCtx.language);
          }
          else{
            onGenerateEasy(authCtx.language);
          }
      }
      else{
          if(authCtx.difficulty === "easy"){
            onGenerateEasy(authCtx.language);
          }
          else if(authCtx.difficulty === "medium"){
            onGenerateMedium(authCtx.language);
          }
          else{
            onGenerateHard(authCtx.language);
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
      userId: authCtx.userData.email.split("@")[0].replace(/[.+-]/g, "_"),
      yourScore: authCtx.yourScore,
      totalScore: authCtx.totalScore,
      rating: authCtx.rating}).then((response)=>{
        toast.success("Record saved successfully");
        setGenerateSignal(!generateSignal);
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
      {+authCtx.questionsSolved === +authCtx.quantity && <RankTable language={authCtx.language} generateSignal={generateSignal}/>}

    </>
  );
}
