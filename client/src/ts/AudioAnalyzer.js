/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from "react";
import AudioVisualizer from "./AudioVisualizer";

const AudioAnalyser = ({ mediaStream, height, width }) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  let analyser = null;
  const rafId = useRef(null);

  const tick = () => {
    const temp = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(temp);
    setAudioData(temp);
    rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!mediaStream) return;
    const audioContext = new window.AudioContext();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(mediaStream);
    source.connect(analyser);
    rafId.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId.current);
      analyser.disconnect();
      source.disconnect();
    };
  }, [mediaStream]);

  return <AudioVisualizer audioData={audioData} height={height} width={width} />;
};

export default AudioAnalyser;
