import React from "react";
import Logout from "../Logout";

export default function NavBar() {
  return (
    <div style={{ position: "absolute" }}>
      <button>
        <a href="/">home</a>
      </button>
      <button>
        <a href="/setting">setting</a>
      </button>
      <button>
        <a href="/login">login</a>
      </button>
      <button>
        <a href="/sign-up">sign up</a>
      </button>
      <Logout />
    </div>
  );
}
