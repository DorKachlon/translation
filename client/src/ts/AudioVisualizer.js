import React, { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioData }) => {
  const canvas = useRef(null);

  useEffect(() => {
    const { height, width } = canvas.current;
    const context = canvas.current.getContext(`2d`);
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = `#000000`;
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    audioData.forEach((item) => {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    });
    context.lineTo(x, height / 2);
    context.stroke();
  });

  return <canvas width="300" height="300" ref={canvas} />;
};

export default AudioVisualizer;
