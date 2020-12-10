import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Text2speech() {
  const [audio, setAudio] = useState();
  const fetching = async () => {
    const { data } = await axios.post("/api/v1/exercise");
    debugger;
  };
  useEffect(async () => {
    const { data } = await axios.post("/api/v1/exercise");
    setAudio(data);
  }, []);
  // return <div>{audio && <button onClick={() => fetching()}>click</button>}</div>;
  return (
    <div>{audio && <audio controls autoplay src={`data:audio/ogg;base64, ${audio}`}></audio>}</div>
  );
}
