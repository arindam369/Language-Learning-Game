import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Quiz from "@/components/Quiz";
import Instructions from "@/components/Instructions";
import { useContext, useState } from "react";
import QuizContent from "@/components/QuizContent";
import Scoreboard from "@/components/Scoreboard";
import { englishEasyQuiz, englishMediumQuiz, englishHardQuiz } from "@/src/helpers/quizContent";
import AuthContext from "@/store/AuthContext";

export default function IndexPage(){
  const [visibleRules, setVisibleRules] = useState(true);
  const [currentQues, setCurrentQues] = useState(null);
  const [shouldGoNext, setShouldGoNext] = useState(null);
  // console.log(shouldGoNext)

  const authCtx = useContext(AuthContext);

  const onQuiz = (language, difficulty, quantity)=>{
      console.log(difficulty);
      setVisibleRules(false);
      if(difficulty==="easy"){
        generateEasy();
      }
      else if(difficulty === "medium"){
        generateMedium();
      }
      else{
        generateHard();
      }
  }

  const generateEasy = ()=>{
    setCurrentQues(englishEasyQuiz[authCtx.easyIndex]);
    authCtx.updateEasyIndex(authCtx.easyIndex+1);
  }
  const generateMedium = ()=>{
    setCurrentQues(englishMediumQuiz[authCtx.mediumIndex]);
    authCtx.updateMediumIndex(authCtx.mediumIndex+1);
  }
  const generateHard = ()=>{
    setCurrentQues(englishHardQuiz[authCtx.hardIndex]);
    authCtx.updateHardIndex(authCtx.hardIndex+1);
  }

  const goNext = ()=>{
    setShouldGoNext(!shouldGoNext);
  }

  return (
    <>
      <Navbar/>
      <div className={styles.homeContainer}>
        {visibleRules && <>
          <Quiz onQuiz={onQuiz}/>
          <Instructions/>
        </>}
        {
          !visibleRules && <>
            {+authCtx.questionsSolved < +authCtx.quantity && <QuizContent content={currentQues} onNext={goNext}/>}
            <Scoreboard onGenerateEasy={generateEasy} onGenerateMedium={generateMedium} onGenerateHard={generateHard} shouldGoNext={shouldGoNext}/>
          </>
        }
      </div>
    </>
  )
}