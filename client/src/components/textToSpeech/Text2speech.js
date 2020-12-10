import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Text2speech() {
  const [audio, setAudio] = useState();

  useEffect(async () => {
    // const { data } = await axios.post("/api/v1/exercise");
    // setAudio(data);
  }, []);

  return (
    <div>
      {audio && (
        <audio
          controls
          // autoPlay
          src={`data:audio/ogg;base64, ${audio}`}
        ></audio>
      )}
    </div>
  );
}
