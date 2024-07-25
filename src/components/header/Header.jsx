import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-content flex">
        <Link to="/">
          <img src="/bujo-logo.png" alt="bujo logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
