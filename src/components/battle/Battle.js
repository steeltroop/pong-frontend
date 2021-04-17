import React from "react";
import { useSelector } from "react-redux";
import GameBoard from "../gameBoard/GameBoard";
import ChatRoom from "../chatRoom/ChatRoom";
import Webcam from "../webcam/Webcam";
import Modal from "../modal/Modal";

const Battle = ({ socket }) => {
  const isPartnerDisconnected = useSelector(state => state.modal.isPartnerDisconnected);

  return (
    <div>
      {isPartnerDisconnected && <Modal />}
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
