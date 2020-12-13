import "./App.css";
import Records from "./components/Records";
import Records2 from "./components/Records2";
import Records3 from "./components/Records3";
import Records4 from "./components/Records4";

import Text2speech from "./components/textToSpeech/Text2speech";
function App() {
  return (
    <div className="App">
      <Records />
      <Records2 />
      <Records3 />
      <Records4 />

      <Text2speech />
    </div>
  );
}

export default App;
