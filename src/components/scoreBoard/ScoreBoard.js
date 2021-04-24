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
              <div className={styles.userWrapper}>
                Hero
              </div>
              <div>
                {userScore}
              </div>
            </div>
            <div className={styles.partnerScore}>
              <div className={styles.userWrapper}>
                Villain
              </div>
              <div>
                {partnerScore}
              </div>
            </div>
          </div>
        : <div className={styles.count} >READY! {isMatched && count}</div>}
    </>
  );
};

export default ScoreBoard;
