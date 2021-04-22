import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ChatRoom.module.css";

const ChatRoom = ({ socket }) => {
  const [text, setText] = useState("");
  const roomMatch = useSelector(state => state.roomMatch);
  const partnerSocketId = roomMatch.partner.socketId;
  const userSocketId = useSelector(state => state.user.socketId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;

    socket.emit("sendTextMessage", { text, userSocketId, partnerSocketId });

    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.textList}>
        {roomMatch.chats.length > 0 && (
          roomMatch.chats.map((chat, index) => {
            const isMyText = chat.userSocketId === userSocketId;

            return (
              <div className={isMyText ? styles.userBubble : styles.partnerBubble}>
                <div className={styles.bubbleA}></div>
                <div className={styles.bubbleB}></div>
                <div className={styles.bubbleC}></div>
                <li
                  key={index}
                  className={isMyText ? styles.userText : styles.partnerText}
                >
                  {chat.text}
                </li>
                <div className={styles.bubbleC}></div>
                <div className={styles.bubbleB}></div>
                <div className={styles.bubbleA}></div>
                <div className={isMyText ? styles.userArrow : styles.partnerArrow}>
                  <div className={styles.arrowA}></div>
                  <div className={styles.arrowB}></div>
                  <div className={isMyText ? styles.userArrowC : styles.partnerArrowC}></div>
                  <div className={isMyText ? styles.userArrowD : styles.partnerArrowD}></div>
                </div>
              </div>
            );
          })
        )}
      </ul>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input type="text" onChange={handleTextChange} value={text} />
          </div>
          <div>
            <button type="submit">
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
