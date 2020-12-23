import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import network from "../services/network";
export default function Logout() {
  let history = useHistory();

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
      //   setLogin(false);
      history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={logoutClickHandler}>logout</button>;
}
