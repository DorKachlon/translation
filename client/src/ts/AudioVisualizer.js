import React, { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioData, height, width }) => {
  const canvas = useRef(null);

  useEffect(() => {
    const { height: currentHeight, width: currentWidth } = canvas.current;
    const context = canvas.current.getContext("2d");
    let x = 0;
    const sliceWidth = (currentWidth * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, currentWidth, currentHeight);

    context.beginPath();
    context.moveTo(0, currentHeight / 2);
    audioData.forEach((item) => {
      const y = (item / 255.0) * currentHeight;
      context.lineTo(x, y);
      x += sliceWidth;
    });
    context.lineTo(x, currentHeight / 2);
    context.stroke();
  }, [audioData]);

  return (
    <>
      <canvas width={width} height={height} ref={canvas} />
    </>
  );
};

export default AudioVisualizer;
