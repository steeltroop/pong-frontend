import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatRoom = ({ socket }) => {
  const [text, setText] = useState("");
  const roomMatch = useSelector(state => state.roomMatch);
  const userSocketId = useSelector(state => state.user.socketId);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("sendTextMessage", { text, userSocketId });

    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <ul>
        {roomMatch.chats.length > 0 && (
          roomMatch.chats.map((chat, index) => {
            const isMyText = chat.socketId === userSocketId;

            return (
              <li key={index}>
                {chat.text}
              </li>
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
