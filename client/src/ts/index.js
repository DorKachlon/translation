import React, { useState } from "react";

import AudioAnalyzer from "./AudioAnalyzer";

const Home = () => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((mediaStream) => setAudio(mediaStream));
  };
  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };
  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="container">
      <main>
        <div className="App">
          <div className="controls">
            <button onClick={toggleMicrophone} type="button">
              {audio ? `Stop microphone` : `Get microphone input`}
            </button>
          </div>
          {audio ? <AudioAnalyzer mediaStream={audio} /> : ``}
        </div>
      </main>
    </div>
  );
};

export default Home;
