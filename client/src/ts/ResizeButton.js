import React, { useEffect, useRef, useState } from "react";

const ResizeButton = ({ audioData, recorderButtonRef }) => {
  useEffect(() => {
    let arrOfY = [];
    audioData.forEach((item) => {
      arrOfY.push(item / 255.0);
    });
    const maxValue = Math.max(...arrOfY) * 2;
    const pixel = 200 * maxValue;
    const forMargin = (pixel - 200) / 2;
    recorderButtonRef.current.style.width = `${pixel}px`;
    recorderButtonRef.current.style.height = `${pixel}px`;
    recorderButtonRef.current.style.margin = `${150 - forMargin}px`;
  }, [audioData]);

  return <></>;
};

export default ResizeButton;
