import React, { useState, useContext, useEffect } from "react";
import Logout from "../Logout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MyTab1, MyTab2 } from "../../styledComponent";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";
import { Logged } from "../../context/LoggedIn";
import { ManualMode } from "../../context/ManualMode";
import PanToolIcon from "@material-ui/icons/PanTool";
import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
import IconButton from "@material-ui/core/IconButton";

export default function NavBar() {
  const [value, setValue] = useState(null);
  const LoggedContext = useContext(Logged);
  const ManualModeContext = useContext(ManualMode);

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
  const handleClickMode = () => {
    ManualModeContext.setManualMode((prev) => !prev);
  };
  return (
    <nav>
      {LoggedContext.logged ? (
        <>
          <NavLink to="/" exact>
            <img className="navbar-logo" src={logo} alt="logo" border="0" />
          </NavLink>
          <div className="navbar-controller">
            <IconButton onClick={handleClickMode}>
              {ManualModeContext.manualMode ? <PanToolIcon /> : <BrightnessAutoIcon />}
            </IconButton>
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
