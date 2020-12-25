import React, { useState, useRef, useContext } from "react";
import network from "../../services/network";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { MyFormControl } from "./styled";
import { Logged } from "../../context/LoggedIn";

import "./style.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();
  const LoggedContext = useContext(Logged);

  async function clickHandler(event) {
    event.preventDefault();
    const obj = {
      email,
      password,
      rememberMe,
    };
    try {
      await network.post(`/api/v1/auth/login`, obj);
      LoggedContext.setLogged(true);
      history.push("/home");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div>Log In</div>
        <form className="form-flex-column" onSubmit={(e) => clickHandler(e)}>
          <MyFormControl>
            <InputBase
              type="email"
              name="email"
              placeholder="Email"
              // value={userName}
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
              endAdornment={
                <InputAdornment style={{ opacity: "0.7" }} position="end">
                  <PeopleIcon />
                </InputAdornment>
              }
            />
          </MyFormControl>
          <MyFormControl>
            <InputBase
              name="password"
              placeholder="Password"
              value={password}
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.currentTarget.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    id="reveal"
                    style={{ opacity: "0.7" }}
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <LockIcon style={{ opacity: "0.7" }} />
                </InputAdornment>
              }
            />
          </MyFormControl>
          <button type="submit">Submit</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
