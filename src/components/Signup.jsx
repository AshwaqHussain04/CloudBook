import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/AlertContext";
import AlertState from "../context/alert/AlertState";

export const Signup = () => {
  let { signupAPI } = useContext(alertContext);
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupAPI(credentials);
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="row">
      <h2 className="mt-2">Signup to use CloudBook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-s" className="form-label mt-4">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name-s"
            onChange={onchange}
            value={credentials.name}
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter your Name"
          />
        </div>
        <div>
          <label htmlFor="email-s" className="form-label mt-4">
            Email address for Signup
          </label>
          <input
            type="email"
            className="form-control"
            id="email-s"
            onChange={onchange}
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div>
          <label htmlFor="password-s" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password-s"
            onChange={onchange}
            value={credentials.password}
            name="password"
            placeholder="Password"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="confirmpassword-s" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword-s"
            onChange={onchange}
            value={credentials.cpassword}
            name="cpassword"
            placeholder="Password"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};
