import React, { FC } from "react";
import { Link } from "react-router-dom";
import NavProfile from "./NavProfile";
import { useAppSelector } from "../../store/hooks";
import { getIsLoggedIn } from "../../store/users";

const Navbar: FC = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());
  return (
    <div className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
