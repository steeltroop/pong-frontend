import React from "react";
import Score from "../score/Score";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = (props) => {
  const {
    count,
    isMatched,
    isPlaying,
    isModerator,
    userScore,
    partnerScore,
  } = props;

  return (
    <>
      {isPlaying
        ? <Score
            isModerator={isModerator}
            userScore={userScore}
            partnerScore={partnerScore}
          />
        : <div className={styles.count}>READY! {isMatched && count}</div>}
    </>
  );
};

export default React.memo(ScoreBoard);
