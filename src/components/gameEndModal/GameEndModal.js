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
        <>
          <div>
            WINNER 🤩
          </div>
          <div>
            잘 하고 있어요 ! 킵 고잉 !
          </div>
        </>
      );
    } else {
      moderatorStatus = (
        <>
          <div>
            LOSER 😭
          </div>
          <div>
            조금만 더 분발해주세요 !
          </div>
        </>
      );
    }
  }

  if (!isModerator) {
    if (userScore === 3) {
      partnerStatus = (
        <>
          <div>
            WINNER 🤩
          </div>
          <div>
            잘 하고 있어요 ! 킵 고잉 !
          </div>
        </>
      );
    } else {
      partnerStatus = (
        <>
          <div>
            LOSER 😭
          </div>
          <div>
            조금만 더 분발해주세요 !
          </div>
        </>
      );
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentButtonWrapper}>
        <div className={styles.contentWrapper}>
          {isModerator && moderatorStatus}
          {!isModerator && partnerStatus}
        </div>
        <div className={styles.buttonWrapper}>
          <div>
            <button
              onClick={handleHomeButtonClick}
              className={styles.button}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
