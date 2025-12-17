import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import alertContext from "./AlertContext";

const AlertState = (props) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    popup: null,
    msg: null,
  });

  //API call function to sign-up the user sent to signup component
  const signupAPI = async (credentials) => {
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (json.success === false) {
      alert("There was an error please try again");
      setAlert({
        popup: "danger",
        msg: "there is some issue",
      });
    } else {
      localStorage.setItem("token", json.authToken);
      setAlert({
        popup: "success",
        msg: "successfully signed up",
      });
      navigate("/");
      
    }
  };

  //API call function to login the user sent to login component

  const loginAPI = async (credentials) => {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setAlert({
        popup: "success",
        msg: "successfully logged in",
      });
      navigate("/");
    } else {
      setAlert({
        popup: "danger",
        msg: "There was some error please try again",
      });
      
    }
  };
  const clearAlert = () => {
    setAlert({
      popup: null,
      msg: null,
    });
  };

  return (
    <alertContext.Provider
      value={{
        signupAPI,
        loginAPI,
        popup: alert.popup,
        msg: alert.msg,
        clearAlert,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
