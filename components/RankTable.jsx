import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { FaTrophy } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";

export default function RankTable({ language, generateSignal }) {
  const [rankData, setRankData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const generateLeaderboard = async () => {
      const scores = await axios.get(`/api/language/${language}`);
      if (scores.data.length > 1) {
        scores.data.sort(function (a, b) {
          const a_accuracy = +a.yourScore / +a.totalScore;
          const b_accuracy = +b.yourScore / +b.totalScore;
          if (a_accuracy < b_accuracy) return 1;
          else if (a_accuracy > b_accuracy) return -1;
          else return 0;
        });
      }
      setRankData(scores.data);
    };

    generateLeaderboard();
  }, [generateSignal]);

  return (
    <>
      <div className={styles.rankTableContainer}>
        <div className={styles.trophyBox}>
          <FaTrophy className={styles.trophyIcon} />
          <span>Leaderboard</span>
        </div>
        <div className={styles.leaderboardTitle}>
          Ranking of <b>{(language).replace(/^\w/, c =>c.toUpperCase())}</b>
        </div>
        <table className={styles.rankTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>UserId</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Difficulty</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {rankData.length > 0 &&
              rankData.map((data, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td className={styles.rankUserId} onClick={()=>{router.push(`/profile/${data.user}`)}}>{data.userId.length>10 ? data.userId.substring(0, 10)+"..." : data.userId}</td>
                    <td>
                      {data.yourScore}/{data.totalScore}
                    </td>
                    <td>
                      {((data.yourScore / data.totalScore) * 100).toFixed(2)}%
                    </td>
                    <td className={data.difficulty==="easy"?"difficultyTag easyColor":data.difficulty==="medium"?"difficultyTag mediumColor":"difficultyTag hardColor"}>
                      {data.difficulty.replace(/^\w/, (c) => c.toUpperCase())}
                    </td>
                    <td>{data.quantity} <span className={styles.questionVanished}>Questions</span></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {rankData.length === 0 && (
          <div className={styles.noRecord}>
            <span>No Record Found</span>
          </div>
        )}
      </div>
    </>
  );
}
