import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import useHeader from "../../hooks/useHeader";

const Header = () => {
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const { isNavCollapsed,handleNavCollapse } = useHeader();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <a className="navbar-brand  font-weight-bolder" href="/">
          {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
          <h3>MontyBicis</h3>
        </a>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsTarger"
          aria-controls="navbarsTarger"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarsTarger">
          <Link className="nav-link text-white" to="/stations">
            Stations
          </Link>
          <Link className="nav-link text-white" to="/Login">
            Login
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
