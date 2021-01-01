import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import NotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import { Logged } from "./context/LoggedIn";
import { Mode } from "./context/Mode";
import { UserLanguages } from "./context/UserLanguages";

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
  const [manualMode, setManualMode] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [lazyMode, setLazyMode] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState();
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    // auth
    (async () => {
      try {
        if (Cookies.get("accessToken")) {
          const { data } = await network.get("/api/v1/auth/validate-token");
          setLogged(data.valid);
        }
        if (Cookies.get("refreshToken")) {
          await network.post("/api/v1/auth/token", { token: Cookies.get("refreshToken") });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (logged) {
          const { data: userInfo } = await network.get("/api/v1/users");
          setNativeLanguage(userInfo.nativeLanguage);
          setCurrentLanguage(userInfo.currentLanguage);
          setLazyMode(userInfo.lazyMode);
          setChatMode(userInfo.chatMode);
          setManualMode(userInfo.manualMode);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [logged]);

  return (
    <>
      <ThemeProvider theme={myTheme}>
        <Logged.Provider value={{ logged, setLogged }}>
          <Mode.Provider
            value={{ manualMode, setManualMode, lazyMode, setLazyMode, chatMode, setChatMode }}
          >
            <UserLanguages.Provider
              value={{ currentLanguage, setCurrentLanguage, nativeLanguage, setNativeLanguage }}
            >
              <Router>
                {!loading ? (
                  <>
                    <NavBar />
                    {logged ? (
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/setting" component={Setting} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route component={NotFound} />
                      </Switch>
                    ) : (
                      <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route component={NotFound} />
                      </Switch>
                    )}
                  </>
                ) : (
                  <Loading />
                )}
              </Router>
            </UserLanguages.Provider>
          </Mode.Provider>
        </Logged.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
