import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import { Logged } from "./context/LoggedIn";
import Cookies from "js-cookie";
import network from "./services/network";
import "./App.css";
import Loading from "./pages/Loading";
import NavBar from "./components/navBar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // auth
    (async () => {
      try {
        if (Cookies.get("accessToken")) {
          const { data } = await network.get("/api/v1/auth/validate-token");
          console.log(data);
          setLogged(data.valid);
          setLoading(false);
        } else if (Cookies.get("refreshToken")) {
          await network.post("/api/v1/auth/token", { token: Cookies.get("refreshToken") });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <Logged.Provider value={{ logged, setLogged }}>
          <Router>
            {!loading ? (
              <>
                <NavBar />
                {logged ? (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/setting" component={Setting} />
                    {/* <Route exact path="/login" component={Login} /> */}
                    {/* <Route exact path="/sign-up" component={SignUp} /> */}
                  </Switch>
                ) : (
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    {/* <Route exact path="/setting" component={Setting} /> */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/sign-up" component={SignUp} />
                  </Switch>
                )}
              </>
            ) : (
              <Loading />
            )}
          </Router>
        </Logged.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
