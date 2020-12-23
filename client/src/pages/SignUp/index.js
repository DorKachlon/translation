import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import network from "../../services/network";
import Dashboard from "../../components/dashboard/Dashboard";
import "./style.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const fname = useRef();
  const lname = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const email = useRef();
  let history = useHistory();
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  async function clickHandler(event) {
    event.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      setError("Your password not the same");
      return;
    }
    if (!nativeLanguage || !learningLanguage) {
      setError("Must to choose languages");
      return;
    }
    const obj = {
      firstName: fname.current.value,
      lastName: lname.current.value,
      email: email.current.value,
      password: password.current.value,
      nativeLanguageId: nativeLanguage.id,
      currentLanguageId: learningLanguage.id,
    };
    try {
      const { data } = await network.post(`/api/v1/auth/register`, obj);
      if (data.success) {
        history.push("/login");
      }
    } catch (error) {
      setError(error.response.data);
    }
  }
  return (
    <div>
      <form className="form-flex-column" onSubmit={(e) => clickHandler(e)}>
        <label for="email">First Name:</label>
        <input name="fname" type="fname" required ref={fname}></input>
        <label for="email">Last Name:</label>
        <input name="lname" type="lname" required ref={lname}></input>
        <label for="email">Email:</label>
        <input name="email" type="email" required ref={email}></input>
        <label for="password">Password:</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          ref={password}
          required
        ></input>
        <label for="password">Confirm Password:</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          ref={confirmPassword}
          required
        ></input>
        <Dashboard
          nativeLanguage={nativeLanguage}
          setNativeLanguage={setNativeLanguage}
          setLearningLanguage={setLearningLanguage}
        />
        <button type="submit">Submit</button>

        {error && <div>{error}</div>}
      </form>
    </div>
  );
}
