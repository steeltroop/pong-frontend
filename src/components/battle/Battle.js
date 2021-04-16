import React from "react";
import GameBoard from "../GameBoard/GameBoard";
import Sidebar from "../sidebar/sidebar";

const Battle = () => {

  return (
    <>
      <div>
        <div>
          <Sidebar />
        </div>
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
          ChattingRoom component here
        </div>
      </div>
    </>
  );
};

export default Battle;
