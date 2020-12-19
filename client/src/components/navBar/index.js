import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <button>
        <a href="/">home</a>
      </button>
      <button>
        <a href="/setting">setting</a>
      </button>
    </div>
  );
}
