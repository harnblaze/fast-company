import React, { FC, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile: FC = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick: React.MouseEventHandler = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={handleClick}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser?.name}</div>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          width="40"
          height="40"
          alt="avatar"
          className="rounded-circle img-fluid"
        />
      </div>
      <div className={`w-100 dropdown-menu${isOpen ? " show" : ""}`}>
        <Link to={`/users/${currentUser?._id ?? ""}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
