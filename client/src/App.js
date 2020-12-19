import "./App.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import NavBar from "./components/navBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/setting" component={Setting} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
