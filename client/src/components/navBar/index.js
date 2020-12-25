import React, { useState, useContext } from "react";
import Logout from "../Logout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MyTab } from "../../styledComponent";
import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";
import { Logged } from "../../context/LoggedIn";
export default function NavBar() {
  const [value, setValue] = useState(0);
  const LoggedContext = useContext(Logged);
  console.log(LoggedContext.logged);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {LoggedContext.logged ? (
        <>
          <NavLink to="/" exact>
            <img className="navbar-logo" src={logo} alt="logo" border="0" />
          </NavLink>
          <div style={{ position: "absolute", right: "0", zIndex: "999" }}>
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
            <MyTab label="Login" component={Link} to="/login" />
            <MyTab label="Sign Up" component={Link} to="/sign-up" />
          </div>
        </>
      )}
    </>
  );
}
