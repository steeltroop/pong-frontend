import React from "react";
import "./ScoreBoard.module.css";

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
        ? <div>{userScore} : {partnerScore}</div>
        : <div>{count}</div>}
    </>
  );
};

export default ScoreBoard;
