import React, { useState, useEffect } from "react";
import Recorder from "./Recorder";
import axios from "axios";

export default function Records7() {
  const [record, setRecord] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [response, setResponse] = useState("");

  const startRecording = () => {
    let rec = null;
    let audioStream = null;
    let constraints = { audio: true, video: false };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        const audioContext = new window.AudioContext();
        setAudioStream(stream);
        const input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        rec.record();
        console.log(rec);
        setRecord(rec);
      })
      .catch(function (err) {});
  };

  const STOPRecording = async () => {
    record.stop();
    audioStream.getAudioTracks()[0].stop();
    record.exportWAV(uploadSoundData);
  };

  async function uploadSoundData(blob) {
    let filename = new Date().toISOString();
    let xhr = new XMLHttpRequest();
    // xhr.onload = function (e) {};
    let formData = new FormData();
    formData.append("audio_data", blob, filename);
    console.log(blob);
    xhr.open("POST", "/api/v1/feedback", true);
    console.log(formData);
    xhr.send(formData);
    // await axios.post("/api/v1/feedback", formData);
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
    </div>
  );
}
