import Navbar from "@/components/Navbar";
import styles from "../styles/Home.module.css";
import Quiz from "@/components/Quiz";
import Instructions from "@/components/Instructions";
import { useContext, useState } from "react";
import QuizContent from "@/components/QuizContent";
import Scoreboard from "@/components/Scoreboard";
import { cppEasyQuiz, cppMediumQuiz, cppHardQuiz, javaEasyQuiz, javaMediumQuiz, javaHardQuiz, pythonEasyQuiz, pythonMediumQuiz, pythonHardQuiz, javascriptEasyQuiz, javascriptMediumQuiz, javascriptHardQuiz } from "@/src/helpers/quizContent";
import AuthContext from "@/store/AuthContext";

export default function IndexPage(){
  const [visibleRules, setVisibleRules] = useState(true);
  const [currentQues, setCurrentQues] = useState(null);
  const [shouldGoNext, setShouldGoNext] = useState(null);
  // console.log(shouldGoNext)

  const authCtx = useContext(AuthContext);

  const onQuiz = (language, difficulty, quantity)=>{
      // console.log(difficulty);
      setVisibleRules(false);
      if(difficulty==="easy"){
        generateEasy(language);
      }
      else if(difficulty === "medium"){
        generateMedium(language);
      }
      else{
        generateHard(language);
      }
  }

  const generateEasy = (language)=>{
    if(language==="c++"){
      setCurrentQues(cppEasyQuiz[authCtx.easyIndex]);
    }
    else if(language==="java"){
      setCurrentQues(javaEasyQuiz[authCtx.easyIndex]);
    }
    else if(language==="python"){
      setCurrentQues(pythonEasyQuiz[authCtx.easyIndex]);
    }
    else{
      setCurrentQues(javascriptEasyQuiz[authCtx.easyIndex]);
    }
    authCtx.updateEasyIndex(authCtx.easyIndex+1);
  }
  const generateMedium = (language)=>{
    if(language==="c++"){
      setCurrentQues(cppMediumQuiz[authCtx.mediumIndex]);
    }
    else if(language==="java"){
      setCurrentQues(javaMediumQuiz[authCtx.mediumIndex]);
    }
    else if(language==="python"){
      setCurrentQues(pythonMediumQuiz[authCtx.mediumIndex]);
    }
    else{
      setCurrentQues(javascriptMediumQuiz[authCtx.mediumIndex]);
    }
    authCtx.updateMediumIndex(authCtx.mediumIndex+1);
  }
  const generateHard = (language)=>{
    if(language==="c++"){
      setCurrentQues(cppHardQuiz[authCtx.hardIndex]);
    }
    else if(language==="java"){
      setCurrentQues(javaHardQuiz[authCtx.hardIndex]);
    }
    else if(language==="python"){
      setCurrentQues(pythonHardQuiz[authCtx.hardIndex]);
    }
    else{
      setCurrentQues(javascriptHardQuiz[authCtx.hardIndex]);
    }
    authCtx.updateHardIndex(authCtx.hardIndex+1);
  }

  const goNext = ()=>{
    setShouldGoNext(!shouldGoNext);
  }

  return (
    <>
      <Navbar/>
      <div className={styles.homeContainer}>
        {(visibleRules || !authCtx.isAuthenticated) && <>
          <Quiz onQuiz={onQuiz}/>
          <Instructions/>
        </>}
        {
          !visibleRules && authCtx.isAuthenticated && <>
            {+authCtx.questionsSolved < +authCtx.quantity && <QuizContent content={currentQues} onNext={goNext}/>}
            <Scoreboard onGenerateEasy={generateEasy} onGenerateMedium={generateMedium} onGenerateHard={generateHard} shouldGoNext={shouldGoNext}/>
          </>
        }
      </div>
    </>
  )
}