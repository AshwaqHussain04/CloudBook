import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar";
import Home from "./components/home.jsx";
import About from "./components/about";
import NoteState from "./context/notes/NoteState.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Alert from "./components/alert.jsx";

export default function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message = "A random warning"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}
