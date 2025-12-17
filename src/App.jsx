import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home.jsx";
import About from "./components/about";
import NoteState from "./context/notes/NoteState.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Alert from "./components/alert.jsx";
import Login from "./components/Login.jsx";
import { Signup } from "./components/Signup.jsx";
import AlertState from "./context/alert/AlertState.jsx";

export default function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
        <AlertState>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </div>
          </AlertState>
        </BrowserRouter>
      </NoteState>
    </>
  );
}
