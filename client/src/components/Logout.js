import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import network from "../services/network";
import { Logged } from "../context/LoggedIn";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
export default function Logout() {
  let history = useHistory();
  const LoggedContext = useContext(Logged);

  const logoutClickHandler = async () => {
    try {
      await network.post("/api/v1/auth/logout", {
        token: Cookies.get("refreshToken"),
      });
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      Cookies.remove("fname");
      Cookies.remove("lname");
      Cookies.remove("email");
      LoggedContext.setLogged(false);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={logoutClickHandler}>
      <ExitToAppIcon />
    </Button>
  );
}
