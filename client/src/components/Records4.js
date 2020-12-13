import React, { useState } from "react";
import MediaStreamRecorder from "msr";

export default function Records4() {
  const [audio, setAudio] = useState(null);

  const getMicrophone = () => {
    var mediaConstraints = {
      audio: true,
    };
    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
  };

  function onMediaSuccess(stream) {
    var mediaRecorder = new MediaStreamRecorder(stream);
    setAudio(mediaRecorder);
    mediaRecorder.mimeType = "audio/wav"; // check this line for audio/wav
    mediaRecorder.ondataavailable = function (blob) {
      // POST/PUT "Blob" using FormData/XHR2
      var blobURL = URL.createObjectURL(blob);
      // document.write('<a href="' + blobURL + '">' + blobURL + "</a>");
      console.log(blobURL);
      console.log(blob);
    };
    mediaRecorder.start(3000);
  }
  const stopMicrophone = () => {
    audio.stop();
    // audio.getTracks().forEach((track) => track.stop());
    // setAudio(null);
  };
  function onMediaError(e) {
    console.error("media error", e);
  }
  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
      return;
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
