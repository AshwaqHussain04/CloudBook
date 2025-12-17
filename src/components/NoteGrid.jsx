import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteCard from "./NoteCard";
import "../styles/NoteGrid.css";
import { useRef } from "react";

const NoteGrid = () => {
  const context = useContext(noteContext);
  const { notes } = context;

  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <h4>No Notes Yet</h4>
        <p>Start by creating your first note to see it here</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NoteGrid;
