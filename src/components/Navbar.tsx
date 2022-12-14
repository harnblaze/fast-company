import React, { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link" to="/main">
          Main
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/users">
          Users
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
