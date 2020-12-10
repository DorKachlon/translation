import "./App.css";
import Records from "./components/Records";
import Records2 from "./components/Records2";

import Text2speech from "./components/textToSpeech/Text2speech";
function App() {
  return (
    <div className="App">
      <Records />
      <Records2 />

      <Text2speech />
    </div>
  );
}

export default App;
