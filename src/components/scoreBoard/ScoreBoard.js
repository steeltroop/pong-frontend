import React from "react";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = (props) => {
  const {
    count,
    isPlaying,
    userScore,
    partnerScore
  } = props;

  return (
    <>
      {isPlaying
        ? <div className={styles.score} >
            <div className={styles.userScore}>
              Hero {userScore} 🦸‍♂️
            </div>
            <div className={styles.partnerScore}>
              Villain {partnerScore} 🦹🏽‍♂️
            </div>
          </div>
        : <div className={styles.count} >READY! {count}</div>}
    </>
  );
};

export default ScoreBoard;
