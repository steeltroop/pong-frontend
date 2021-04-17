import React from "react";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";

const Battle = ({ socket }) => {

  return (
    <div>
      <div>
        <div>
          Scoreboard 3 : 0
        </div>
        <div>
          <Webcam socket={socket} />
        </div>
      </div>
      <div>
        <div>
          <GameBoard />
        </div>
        <div>
          Joystic, game button here
        </div>
      </div>
      <div>
        <ChatRoom socket={socket} />
      </div>
    </div>
  );
};

export default Battle;
