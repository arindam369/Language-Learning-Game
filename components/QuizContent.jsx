import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import AuthContext from "@/store/AuthContext";
import toast from "react-hot-toast";

export default function QuizContent({content, onNext}){
    const [selectedOption, setSelectedOption] = useState(null);
    const authCtx = useContext(AuthContext);

    const selectOption = (id)=>{
        if(selectedOption) return;
        const mySelection = String.fromCharCode("A".charCodeAt(0) + id);
        setSelectedOption(mySelection);

        if(mySelection === content.answer){
            authCtx.updateYourScore(+authCtx.yourScore + +content.score);
        }
        else{
            toast.error(`Correct Option: ${content.answer}`);
        }
        authCtx.updateTotalScore(+authCtx.totalScore + +content.score);

        setTimeout(()=>{
            setSelectedOption(null);
            onNext();
        }, 3000)
    }

    return (
        <>
            <div className={styles.quizContentContainer}>
                <div className={styles.quizQuestion}>{content.question}</div>
                <div className={styles.quizOptions}>
                    {content.options.map((option, id)=>{
                        return (<li key={option} onClick={()=>{selectOption(id)}} className={(selectedOption && selectedOption.charCodeAt(0)-65===id && (selectedOption === content.answer ? "correctAnswer":"wrongAnswer"))||""}>{option}</li>)
                    })}
                </div>
                <div className={styles.pointScore}>{content.score} Points</div>
            </div>
        </>
    )
}