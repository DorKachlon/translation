import React, { useState, useContext, useEffect } from "react";
import Logout from "../Logout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MyTab1, MyTab2 } from "../../styledComponent";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";
import { Logged } from "../../context/LoggedIn";
import { Mode } from "../../context/Mode";
import PanToolIcon from "@material-ui/icons/PanTool";
import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import network from "../../services/network";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DropLanguages from "./dropLanguages";
export default function NavBar() {
  const [value, setValue] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const LoggedContext = useContext(Logged);
  const ModeContext = useContext(Mode);

  const changeBackground = () => {
    if (window.scrollY >= 40) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setValue(2);
        break;
      case "/setting":
        setValue(1);
        break;
      case "/":
        setValue(0);
        break;
      default:
        break;
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSwitch = async (event) => {
    try {
      switch (event.target.name) {
        case "lazyMode":
          ModeContext.setLazyMode(event.target.checked);
          await network.put("/api/v1/users", { lazyMode: event.target.checked });
          break;
        case "manualMode":
          ModeContext.setManualMode(event.target.checked);
          await network.put("/api/v1/users", { manualMode: event.target.checked });
          break;
        case "chatMode":
          ModeContext.setChatMode(event.target.checked);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  };
  console.log(ModeContext.manualMode);
  return (
    <nav className={scrolling ? "navbar-scrolling" : ""}>
      {LoggedContext.logged ? (
        <>
          <NavLink to="/" exact>
            <img className="navbar-logo" src={logo} alt="logo" border="0" />
          </NavLink>
          <div className="navbar-controller">
            <DropLanguages />
            <FormControlLabel
              control={
                <Switch
                  checked={ModeContext.lazyMode}
                  onChange={handleChangeSwitch}
                  color="primary"
                  name="lazyMode"
                />
              }
              label="Lazy Mode:"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={ModeContext.manualMode}
                  onChange={handleChangeSwitch}
                  color="primary"
                  name="manualMode"
                />
              }
              label="Manual Mode:"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={ModeContext.chatMode}
                  onChange={handleChangeSwitch}
                  color="primary"
                  name="chatMode"
                />
              }
              label="Chat Mode:"
              labelPlacement="start"
            />
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Setting" component={Link} to="/setting" />
              <Tab label="Dashboard" component={Link} to="/dashboard" />
            </Tabs>
            <Logout />
          </div>
        </>
      ) : (
        <>
          <NavLink to="/" exact>
            <img className="navbar-logo" src={logo} alt="logo" border="0" />
          </NavLink>
          <div style={{ position: "absolute", right: "0", zIndex: "999" }}>
            <MyTab2 label="Login" component={Link} to="/login" />
            <MyTab1 label="Sign Up" component={Link} to="/sign-up" />
          </div>
        </>
      )}
    </nav>
  );
}
