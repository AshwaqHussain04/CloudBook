import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";

export default function home() {
  const isAuthenticated = localStorage.getItem("token");

  return <div>{isAuthenticated ? <Dashboard /> : <LandingPage />}</div>;
}
