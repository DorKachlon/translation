import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import RecordRTC from "recordrtc";
import StereoAudioRecorder from "recordrtc";
import axios from "axios";

const ENDPOINT = "http://localhost:8080";

export default function Records6() {
  const [audio, setAudio] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { withCredentials: true });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const startRecording = () => {
    let recordAudio;
    navigator.getUserMedia(
      {
        audio: true,
      },
      function (stream) {
        //5)
        recordAudio = RecordRTC(stream, {
          type: "audio",

          //6)
          mimeType: "audio/webm",
          sampleRate: 44100,
          // used by StereoAudioRecorder
          // the range 22050 to 96000.
          // let us force 16khz recording:
          desiredSampRate: 16000,

          // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
          // CanvasRecorder, GifRecorder, WhammyRecorder
          // recorderType: StereoAudioRecorder,
          // Dialogflow / STT requires mono audio
          numberOfAudioChannels: 1,
        });

        recordAudio.startRecording();
        setAudio(recordAudio);
      },
      function (error) {
        console.error(JSON.stringify(error));
      }
    );
  };

  const STOPRecording = async () => {
    audio.stopRecording(async function () {
      // after stopping the audio, get the audio data
      audio.getDataURL(async function (audioDataURL) {
        //2)
        var files = {
          audio: {
            type: audio.getBlob().type || "audio/wav",
            dataURL: audioDataURL,
          },
        };
        // submit the audio file to the server
        console.log(files);
        await axios.post("/api/v1/answer", { base64data: files });
        // socketio.emit("message", files);
      });
    });
  };

  // 3)
  // when the server found results send
  // it back to the client
  // const resultpreview = document.getElementById("results");
  // socketio.on("results", function (data) {
  // console.log(data);
  // show the results on the screen
  // if (data[0].queryResult) {
  // resultpreview.innerHTML += "" + data[0].queryResult.fulfillmentText;
  // }
  // }
  // );

  return (
    <div>
      <button onClick={startRecording} disabled={audio !== null}>
        Start Recording
      </button>
      <button onClick={STOPRecording} disabled={audio === null}>
        Stop Recording
      </button>
    </div>
  );
}
