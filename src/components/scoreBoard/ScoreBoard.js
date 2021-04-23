import React from "react";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = (props) => {
  const {
    count,
    isMatched,
    isPlaying,
    userScore,
    partnerScore
  } = props;

  return (
    <>
      {isPlaying
        ? <div className={styles.score} >
            <div className={styles.userScore}>
              Hero {userScore}
            </div>
            <div className={styles.partnerScore}>
              Villain {partnerScore}
            </div>
          </div>
        : <div className={styles.count} >READY! {isMatched && count}</div>}
    </>
  );
};

export default ScoreBoard;
