import React, { useContext, useEffect } from "react";
import alertContext from "../context/alert/AlertContext";

export default function Alert() {
  const { popup, msg, setAlert } = useContext(alertContext);
  useEffect(() => {
    setTimeout(() => {
      setAlert({
        popup: null,
        msg: null,
      });
    }, 5000);
  }, [popup, msg, setAlert]);

  return <div className={`alert alert-dismissible alert-${popup}`}>{msg}</div>;
}
