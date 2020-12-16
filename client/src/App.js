import "./App.css";
import Records7 from "./components/Records7";
import Dashboard from "./components/dashboard/Dashboard";
import Text2speech from "./components/textToSpeech/Text2speech";

function App() {
  return (
    <div className="App">
      <Dashboard />

      <Records7 />

      <Text2speech />
    </div>
  );
}

export default App;
