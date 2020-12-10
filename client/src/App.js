import "./App.css";
import Records from "./components/Records";
import Text2speech from "./components/textToSpeech/Text2speech";
function App() {
  return (
    <div className="App">
      <Records />
      <Text2speech />
    </div>
  );
}

export default App;
