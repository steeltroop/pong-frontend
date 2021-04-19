import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import Modal from "../modal/Modal";
import styles from "./Battle.module.css";

const Battle = ({ socket }) => {
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);
  const [count, setCount] = useState(3);
  const { isMatched } = useSelector(state => state.roomMatch);
  const timerRef = useRef();

  useEffect(() => {
    if (count === 0) clearInterval(timerRef.current);

    if (isMatched && count === 3) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
  }, [isMatched, count]);

  return (
    <div className={styles.wrapper}>
      {isPartnerDisconnected && <Modal />}
      <div className={styles.container}>
        <ScoreBoard count={count} />
        <Webcam socket={socket} />
      </div>
      {isMatched && count === 0
        ? <GameBoard socket={socket} />
        : <div style={{color: "black"}}>Finding user...</div>}
      <ChatRoom socket={socket} />
    </div>
  );
};

export default Battle;
