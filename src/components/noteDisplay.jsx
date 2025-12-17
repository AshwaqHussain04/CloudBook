import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteGrid from "./NoteGrid";
import "../styles/noteDisplay.css";

export default function NoteDisplay({ updatenote }) {
  const context = useContext(noteContext);
  const { notes } = context;

  return (
    <div className="note-display-container">
      <NoteGrid onEdit={updatenote} />
    </div>
  );
}
