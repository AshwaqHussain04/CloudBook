import React, { useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

export default function navbar() {
  const location = useLocation();
  useEffect(() => {}, [location]);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CloudBook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                activeclassname="active"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  Action
                </Link>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </div>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <Link
                type="button"
                to={"/login"}
                className="btn btn-dark mx-2 w-50"
              >
                Login
              </Link>
              <Link
                type="button"
                to={"/signup"}
                className="btn btn-dark mx-2 w-50"
              >
                Sign-Up
              </Link>
            </form>
          ) : (
            <button onClick={logout} className="btn btn-dark mx-2">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
