import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar: FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
          {currentUser !== undefined && (
            <li>
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser !== undefined ? (
            <p>User</p>
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
