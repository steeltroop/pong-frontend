import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./GameEndModal.module.css";

const GameEndModal = ({ userScore, socket }) => {
  const isModerator = useSelector(state => state.roomMatch.gameBoard.isModerator);
  const partnerSocketId = useSelector(state => state.roomMatch.partner.socketId);
  const userSocketId = useSelector(state => state.user.socketId);
  const userEmail = useSelector(state => state.user.email);

  let moderatorStatus = null;
  let partnerStatus = null;

  useEffect(() => {
    if (isModerator && userScore === 3 || !isModerator && userScore === 3) {
      (async () => {
        try {
          const res = await fetch(process.env.REACT_APP_PORT + "/battle", {
            credentials: "include",
            method: "PATCH",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              email: userEmail
            })
          });
        } catch(err) {
          console.log(err);
          return err;
        }
      })();
    }
  }, []);

  const handleHomeButtonClick = () => {
    socket.removeAllListeners("sendTextMessage");
    socket.emit("leaveRoom", { userSocketId, partnerSocketId });
  };

  if (isModerator && userScore === 3) {
    console.log("방장 일때 점수 올라가는 로직");

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

  if (!isModerator && userScore === 3) {
    console.log("모더레이터 아닐 때 점수 올라가는 로직");

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.statusWrapper}>
        {isModerator && moderatorStatus}
        {!isModerator && partnerStatus}
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.buttons}>
          <button onClick={handleHomeButtonClick}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
