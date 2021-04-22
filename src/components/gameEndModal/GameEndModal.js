import React from "react";
import { useSelector } from "react-redux";
import styles from "./GameEndModal.module.css";

const GameEndModal = ({ userScore, socket }) => {
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const userSocketId = useSelector(state => state.user.socketId);

  let moderatorStatus = null;
  let partnerStatus = null;

  const handleHomeButtonClick = () => {
    socket.removeAllListeners("sendTextMessage");
    socket.emit("leaveRoom", { userSocketId, partnerSocketId });
  };

  const handleRematchButtonClick = () => {
    console.log("handle Rematch Button click!");
  };

  if (isModerator) {
    if (userScore === 3) {
      moderatorStatus = (
        <div>
          WINNER 🤩
        </div>
      );
    } else {
      moderatorStatus = (
        <div>
          LOSER 😭
        </div>
      );
    }
  }

  if (!isModerator) {
    if (userScore === 3) {
      partnerStatus = (
        <div>
          WINNER 🤩
        </div>
      );
    } else {
      partnerStatus = (
        <div>
          LOSER 😭
        </div>
      );
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.statusWrapper}>
        {isModerator && moderatorStatus}
        {!isModerator && partnerStatus}
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttons}>
          <button onClick={handleHomeButtonClick}>Home</button>
          <button onClick={handleRematchButtonClick}>Rematch</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
