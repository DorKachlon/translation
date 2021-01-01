import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import network from "../../services/network";
import SignUpSelectors from "../../components/selectors/SignUpSelectors";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import PeopleIcon from "@material-ui/icons/People";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import { MyFormControl, MyButton } from "../../styledComponent";
import "./style.css";
import registerValidation from "./schemaValidation";
import ParticlesLiveBackground from "../../components/particles";
import PeopleSVG from "./people.svg";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();
  let history = useHistory();

  async function clickHandler(event) {
    event.preventDefault();
    setError("");
    if (!nativeLanguage || !learningLanguage) {
      setError("Must to choose languages");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your password not the same");
      return;
    }
    const obj = {
      firstName,
      lastName,
      email,
      password,
      nativeLanguageId: nativeLanguage.id,
      currentLanguageId: learningLanguage.id,
    };
    try {
      await registerValidation(obj);
      const { data } = await network.post(`/api/v1/auth/register`, obj);
      if (data.success) {
        history.push("/login");
      }
    } catch (error) {
      if (error.errors) {
        setError(error.errors);
      } else if (error.response.status === 500) {
        setError(error.response.statusText);
      } else {
        setError(error.response.data);
      }
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-background">
        <div className="signup-title">create account</div>
        <form className="signup-form" onSubmit={(e) => clickHandler(e)}>
          <div className="fname-lname">
            <MyFormControl>
              <InputBase
                type="fname"
                name="fname"
                id="fname"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.currentTarget.value)}
                endAdornment={
                  <InputAdornment style={{ opacity: "0.7" }} position="end">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
            </MyFormControl>
            <MyFormControl>
              <InputBase
                type="lname"
                name="lname"
                id="lname"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.currentTarget.value)}
                endAdornment={
                  <InputAdornment style={{ opacity: "0.7" }} position="end">
                    <PeopleIcon />
                  </InputAdornment>
                }
              />
            </MyFormControl>
          </div>
          <MyFormControl>
            <InputBase
              type="email"
              name="email"
              autoComplete="email"
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
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
              endAdornment={
                <InputAdornment style={{ opacity: "0.7" }} position="end">
                  <LockIcon />
                </InputAdornment>
              }
            />
          </MyFormControl>
          <MyFormControl>
            <InputBase
              name="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
          <SignUpSelectors
            nativeLanguage={nativeLanguage}
            setNativeLanguage={setNativeLanguage}
            setLearningLanguage={setLearningLanguage}
          />
          <MyButton variant="contained" type="submit">
            Sign Up
          </MyButton>
        </form>
        {error && (
          <div className="signup-error">
            <ErrorOutlineOutlinedIcon style={{ color: "white" }} />
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="login-particles">
        <div className="login-people-container">
          <img src={PeopleSVG} className="login-people-svg" alt="" />
        </div>
        <ParticlesLiveBackground />
      </div>
    </div>
  );
}
