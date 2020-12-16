import React, { useState } from "react";
import ReactRecord from "react-record";

export default function Records3() {
  const [blobURL, setBlobURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of data is: ", recordedBlob);
  };

  const onSave = (blobObject) => {
    console.log("You can tap into the onSave callback", blobObject);
  };

  const onStop = (blobObject) => {
    console.log("blobObject is: ", blobObject);
    setBlobURL(blobObject.blobURL);
  };

  const onStart = (blobObject) => {
    console.log("chunk of blobObject is: ", blobObject);
  };

  return (
    <div className="record-mic">
      <ReactRecord
        record={isRecording}
        onStop={onStop}
        onStart={onStart}
        onSave={onSave}
        onData={onData}
      >
        {/* <div>
          <audio
            ref={(c) => {
              audioSource = c;
            }}
            controls="controls"
            src={blobURL}
          >
            <track kind="captions" />
          </audio>
        </div> */}
        <button onClick={startRecording} type="button">
          Start
        </button>
        <button onClick={stopRecording} type="button">
          Stop
        </button>
      </ReactRecord>
    </div>
  );
}
