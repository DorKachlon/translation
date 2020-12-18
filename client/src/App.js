import "./App.css";
import Records7 from "./components/recorder/Records7";
import Dashboard from "./components/dashboard/Dashboard";
import Dashboard2 from "./components/dashboard/Dashboard2";

import Text2speech from "./components/textToSpeech/Text2speech";

function App() {
  return (
    <div className="App">
      <Dashboard />

      <Records7 />

      <Text2speech />
      <Dashboard2 />
    </div>
  );
}

export default App;
