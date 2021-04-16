import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const [text, setText] = useState("");
  const chats = useSelector(state => state.roomMatch.chats);

  const handleSubmit = (e) => {
    e.preventDefault();

    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div>
        Content Box
      </div>
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
