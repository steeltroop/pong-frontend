import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import styles from "./Webcam.module.css";

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

      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

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
          partnerVideo.current.srcObject = stream;
        });

        socket.on("acceptCall", signal => {
          peer.signal(signal);
        });

        socket.on("destroyPeer", () => {
          stream && stream.getTracks().forEach(track => track.stop());
          peer.removeAllListeners("signal");
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
          partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);

        socket.on("destroyPeer", () => {
          stream && stream.getTracks().forEach(track => track.stop());
          peer.removeAllListeners("signal");
        });
      }
    })();
  }, [isCalling, isCallAccepted]);

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        ref={userVideo}
        playsInline
        autoPlay
        muted
      />
      <video
        className={styles.video}
        ref={partnerVideo}
        playsInline
        autoPlay
        muted
      />
    </div>
  );
};

export default Webcam;
