import React, { useState } from "react";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
export default function Records() {
  const [audioDetails, SetAudioDetails] = useState({
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  });

  const handleAudioStop = (data) => {
    console.log(data);
    SetAudioDetails({ audioDetails: data });
  };
  const handleAudioUpload = (file) => {
    console.log(file);
  };
  const handleRest = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    SetAudioDetails({ audioDetails: reset });
  };
  return (
    <div>
      <Recorder
        record={true}
        title={"New recording"}
        audioURL={audioDetails.audioDetails.url}
        showUIAudio
        handleAudioStop={(data) => handleAudioStop(data)}
        handleAudioUpload={(data) => handleAudioUpload(data)}
        handleRest={() => handleRest()}
      />
    </div>
  );
}
