import React, { useState } from "react";
import Recorder from "../../components/recorder";
import StartButton from "../../components/startButton";
export default function Home() {
  const [start, setStart] = useState(false);

  return <>{start ? <Recorder /> : <StartButton setStart={setStart} />}</>;
}
