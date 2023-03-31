import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUserData } from "../../store/users";

const NavProfile: FC = () => {
  const currentUser = useAppSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);
  const handleClick: React.MouseEventHandler = () => {
    setIsOpen((prevState) => !prevState);
  };
  if (currentUser === undefined) return <>Loading...</>;
  return (
    <div className="dropdown" onClick={handleClick}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser?.name}</div>
        <img
          src={currentUser?.image}
          width="40"
          height="40"
          alt="avatar"
          className="rounded-circle img-fluid"
        />
      </div>
      <div className={`w-100 dropdown-menu${isOpen ? " show" : ""}`}>
        <Link to={`/users/${currentUser?._id}`} className="dropdown-item">
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
