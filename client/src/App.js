import "./App.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";

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
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/landing" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
