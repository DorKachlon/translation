import React, { useState } from "react";
import axios from "axios";

export default function Records5() {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const options = {
        sampleRate: 24000,
        // mimeType: "audio/ogg;codecs=opus'",
      };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.start();

      setAudio(mediaRecorder);

      console.log(MediaRecorder.isTypeSupported("audio/mp3"));
      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunks, {
          type: "audio/wav",
        });
        console.log(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioFile = new Audio(audioUrl);
        audioFile.play();
        const { data: text } = await axios.post("/api/v1/answer", { base64data: audioBlob });
      });
    });
  };

  const stopMicrophone = () => {
    audio.stop();
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
    <div className="controls">
      <button onClick={toggleMicrophone} type="button">
        {audio ? `Stop microphone` : `Get microphone input`}
      </button>
    </div>
  );
}
