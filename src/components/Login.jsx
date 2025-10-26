import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/AlertContext";

const Login = () => {
  const { loginAPI } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAPI(credentials);
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="row">
      <h2 className="mt-2">Login to Continue using CloudBook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
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
          <label htmlFor="password" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            value={credentials.password}
            name="password"
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

export default Login;
