import React, { useState } from "react";
import { ReactMic } from "react-mic";
import axios from "axios";
export default function Records2() {
  const [record, setRecord] = useState(false);
  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);

    console.log(recordedBlob.blob);

    //!
    var reader = new FileReader();
    reader.readAsDataURL(recordedBlob.blob);
    reader.onloadend = async () => {
      //   var base64data = reader.result;
      var base64data = reader.result.replace(/^data:.+;base64,/, "");
      const { data: text } = await axios.post("/api/v1/feedback", { base64data: base64data });

      console.log(text);
    };
    //!

    //!!
    // let fileReader = new FileReader();
    // let arrayBuffer;

    // fileReader.onloadend = () => {
    //   arrayBuffer = fileReader.result;
    // };
    // console.log(fileReader.readAsArrayBuffer(recordedBlob.blob));
    //!!
  };
  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
        mimeType="audio/mp3"
        echoCancellation={true}
        autoGainControl={true}
        noiseSuppression={true}
      />
      <button onClick={() => startRecording()} type="button">
        Start
      </button>
      <button onClick={() => stopRecording()} type="button">
        Stop
      </button>
    </div>
  );
}
