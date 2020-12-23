import React, { useState, useRef } from "react";
import network from "../../services/network";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const password = useRef();
  const email = useRef();
  let history = useHistory();

  async function clickHandler(event) {
    event.preventDefault();
    const obj = {
      email: email.current.value,
      password: password.current.value,
      rememberMe,
    };
    try {
      await network.post(`/api/v1/auth/login`, obj);
      history.push("/home");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div>
      <form className="form-flex-column" onSubmit={(e) => clickHandler(e)}>
        <label for="email">Email:</label>
        <input name="email" type="email" required ref={email}></input>
        <label for="password">Password:</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          ref={password}
          required
        ></input>
        <button type="submit">Submit</button>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
