import React from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import Modal from "../modal/Modal";
import styles from "./Battle.module.css";

const Battle = ({ socket }) => {
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);

  return (
    <div className={styles.wrapper}>
      {isPartnerDisconnected && <Modal />}
      <div className={styles.container}>
        <ScoreBoard />
        <Webcam socket={socket} />
      </div>
      <GameBoard socket={socket} />
      <ChatRoom socket={socket} />
    </div>
  );
};

export default Battle;
