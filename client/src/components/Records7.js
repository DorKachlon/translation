import React, { useState, useEffect } from "react";
import Recorder from "./Recorder";
import axios from "axios";
import useSound from "use-sound";
import SoundIn from "../sound-effect/sound-in.mp3";
import SoundOut from "../sound-effect/sound-out.mp3";

export default function Records7() {
  const [record, setRecord] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [response, setResponse] = useState("");
  const [playSoundIn] = useSound(SoundIn);
  const [playSoundOut] = useSound(SoundOut);

  const startRecording = () => {
    let rec = null;
    let constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        const audioContext = new window.AudioContext();
        setAudioStream(stream);
        const input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        playSoundIn();
        rec.record();
        setRecord(rec);
      })
      .catch(function (err) {});
  };

  const STOPRecording = async () => {
    record.stop();
    playSoundOut();
    audioStream.getAudioTracks()[0].stop();
    record.exportWAV(uploadSoundData);
  };

  async function uploadSoundData(blob) {
    //create FormData with Buffer
    let filename = new Date().toISOString();
    let formData = new FormData();
    formData.append("audio_data", blob, filename);
    //axios request
    const { data } = await axios.post("/api/v1/feedback", formData);
    setResponse(data.response);
    setRecord(null);
  }

  return (
    <div>
      <button onClick={startRecording} disabled={record !== null}>
        Start Recording
      </button>
      <button onClick={STOPRecording} disabled={record === null}>
        Stop Recording
      </button>
      <div>{response}</div>
    </div>
  );
}
