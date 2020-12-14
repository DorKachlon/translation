import "./App.css";
import Records from "./components/Records";
import Records2 from "./components/Records2";
import Records3 from "./components/Records3";
import Records4 from "./components/Records4";
import Records5 from "./components/Records5";
import Records6 from "./components/Records6";
import Records7 from "./components/Records7";
import Dashboard from "./components/Selector";

import Index from "./ts";

import Text2speech from "./components/textToSpeech/Text2speech";
function App() {
  return (
    <div className="App">
      <Dashboard />
      {/* <Records /> */}
      <Records2 />
      {/* <div>33333333333</div> */}
      {/* <Records3 /> */}
      {/* <Records4 /> */}
      {/* <Records5 /> */}
      {/* <div>666666666666666</div> */}
      {/* <Records6 /> */}
      {/* <div>7777777777777777</div> */}
      <Records7 />

      {/* <Index /> */}
      <Text2speech />
    </div>
  );
}

export default App;
