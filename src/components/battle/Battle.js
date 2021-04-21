import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoy from "../gameBoy/GameBoy";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import Modal from "../modal/Modal";
import styles from "./Battle.module.css";
import { NUMBERS } from "../../constants/index";

const Battle = ({ socket }) => {
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);
  const [count, setCount] = useState(3);
  const [isPlaying, setPlaying] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [partnerScore, setPartnerScore] = useState(0);
  const { isMatched } = useSelector(state => state.roomMatch);
  const timerRef = useRef();

  useEffect(() => {
    if (count === NUMBERS.END_COUNT) {
      clearInterval(timerRef.current);
      setPlaying(true);
    }

    if (isMatched && count === NUMBERS.INITIAL_COUNT) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - NUMBERS.SUBTRACT_NUMBER);
      }, NUMBERS.DELAY);
    }
  }, [isMatched, count]);

  const plusUserScore = () => {
    setUserScore(prev => prev + 1);
  };

  const plusPartnerScore = () => {
    setPartnerScore(prev => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      {isPartnerDisconnected && <Modal />}
      <div className={styles.webcamWrapper}>
        <ScoreBoard
          count={count}
          isPlaying={isPlaying}
          userScore={userScore}
          partnerScore={partnerScore}
        />
        <Webcam socket={socket} />
      </div>
      <GameBoy>
        {isMatched && count === NUMBERS.END_COUNT
          ? <GameBoard
              socket={socket}
              plusUserScore={plusUserScore}
              plusPartnerScore={plusPartnerScore}
            />
          : <div style={{color: "black"}}>Finding user...</div>}
      </GameBoy>
      <ChatRoom socket={socket} />
    </div>
  );
};

export default Battle;
