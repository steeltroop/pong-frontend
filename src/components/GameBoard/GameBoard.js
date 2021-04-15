import React, { useRef } from "react";

const GameBoard = () => {
  const canvasRef = useRef();
  const canvasObj = canvasRef.current;
  const ctx = canvasObj.getContext("2d");

  return (
    <div></div>
  );
};

export default GameBoard;
