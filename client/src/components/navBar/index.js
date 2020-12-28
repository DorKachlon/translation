import React, { useState, useContext, useEffect } from "react";
import Logout from "../Logout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MyTab1, MyTab2 } from "../../styledComponent";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";
import { Logged } from "../../context/LoggedIn";

export default function NavBar() {
  const [value, setValue] = useState(null);
  const LoggedContext = useContext(Logged);
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
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
  console.log(value);
  return (
    <>
      {LoggedContext.logged ? (
        <>
          <NavLink to="/" exact>
            <img className="navbar-logo" src={logo} alt="logo" border="0" />
          </NavLink>
          <div className="navbar-controller">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Setting" component={Link} to="/setting" />
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
    </>
  );
}
