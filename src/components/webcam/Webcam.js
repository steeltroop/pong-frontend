import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";

const Webcam = ({ socket }) => {
  const partner = useSelector(state => state.roomMatch.partner);
  const {
    isCalling,
    isCallAccepted,
    callerSignal,
  } = useSelector(state => state.roomMatch.webcam);
  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    (async () => {
      const stream = await navigator
        .mediaDevices
        .getUserMedia({
          video: true,
          audio: false
        });

      userVideo.current.srcObject = stream;

      if (isCalling) {
        const peer = new Peer({
          initiator: true,
          trickels: false,
          stream: stream
        });

        peer.on("signal", data => {
          socket.emit("callUser", {
            partnerSocketId: partner.socketId,
            signalData: data
          });
        });

        peer.on("stream", stream => {
          console.log("is stream working ?")
          partnerVideo.current.srcObject = stream;
        });

        socket.on("acceptCall", signal => {
          console.log("is acceptCall working ?");
          console.log(signal);
          peer.signal(signal);
        });
      }

      if (isCallAccepted) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        });

        peer.on("signal", data => {
          socket.emit("acceptCall", {
            signalData: data,
            partnerSocketId: partner.socketId
          });
        });

        peer.on("stream", stream => {
          console.log("iscallAccepted stream workgin");
          partnerVideo.current.srcObject = stream;
        });
        console.log(callerSignal);
        peer.signal(callerSignal);
      }
    })();
  }, [isCalling, isCallAccepted]);

  return (
    <>
      <div>
        <video playsInline ref={userVideo} autoPlay muted />
      </div>
      <div>
        <video playsInline ref={partnerVideo} autoPlay muted />
      </div>
    </>
  );
};

export default Webcam;
