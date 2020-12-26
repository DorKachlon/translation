import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import network from "../../services/network";

import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import EmailIcon from "@material-ui/icons/Email";
import { Logged } from "../../context/LoggedIn";
import { MyFormControl, MyButton } from "../../styledComponent";
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
      history.push("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div>Log In</div>
        <form className="login-form" onSubmit={(e) => clickHandler(e)}>
          <MyFormControl>
            <InputBase
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
              endAdornment={
                <InputAdornment style={{ opacity: "0.7" }} position="end">
                  <EmailIcon />
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
          <MyButton variant="contained" type="submit">
            Log in
          </MyButton>
        </form>
        {error && (
          <div className="login-error">
            <ErrorOutlineOutlinedIcon style={{ color: "white" }} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
