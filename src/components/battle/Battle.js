import React from "react";
import GameBoard from "../gameBoard/GameBoard";
import Sidebar from "../sidebar/sidebar";
import ChatRoom from "../chatRoom/ChatRoom";

const Battle = ({ socket }) => {

  return (
    <>
      <div>
        <div>
          <div>
            Scoreboard 3 : 0
          </div>
          <div>
            Cam component here
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
    </>
  );
};

export default Battle;
