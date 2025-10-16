import React from "react";

export default function Alert(props) {
  return (
    <div className="alert alert-dismissible alert-warning">
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
      {props.message}
    </div>
  );
}
