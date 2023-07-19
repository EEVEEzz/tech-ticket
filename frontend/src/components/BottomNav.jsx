import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHouseUser, FaGlobe, FaUpload } from "react-icons/fa";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // will retain set btn styles on the active route
  const pathMatchRoute = (route) => {
    try {
      if (route === location.pathname) {
        return true;
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <footer className="">
      <ul className="z-20 btm-nav">
        <li onClick={() => navigate("/")}>
          <div className={pathMatchRoute('/') ? "btn btn-primary-focus btn-sm" : "btn btn-primary btn-sm"}>
            <FaGlobe width="36px" height="36px" />
            <p>Home</p>
          </div>
        </li>
        <li onClick={() => navigate("/offers")}>
          <div className={pathMatchRoute('/offers') ? "btn btn-primary-focus btn-sm" : "btn btn-primary btn-sm"}>
            <FaUpload width="36px" height="36px" />
            <p>Tickets</p>
          </div>
        </li>
        <li onClick={() => navigate("/profile")} className="">
          <div className={pathMatchRoute('/profile') ? "btn btn-primary-focus btn-sm" : "btn btn-primary btn-sm"}>
            <FaHouseUser width="36px" height="36px" />
            <p>Profile</p>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default BottomNav;