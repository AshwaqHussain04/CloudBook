import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { byPrefixAndName } from "@awesome.me/kit-KIT_CODE/icons";

export default function NoteDisplay({ note,updatenote }) {
  const mystyle = {
    maxWidth: "20rem",
  };

  const context = useContext(noteContext);

  const { delNote , editNote } = context;
  return (
    <>
      <div className="card border-primary mb-3 mx-3 my-3" style={mystyle}>
        <div className="card-header">Your Note</div>
        <div className="card-body">
          <h4 className="card-title">{note.title}</h4>
          <p className="card-text">{note.description}</p>
          <i className="bi bi-trash" onClick={()=>{delNote(note._id)}}></i>
          <i className="bi bi-pencil mx-3" onClick={()=>{updatenote(note)}}></i>
        </div>
      </div>
    </>
  );
}
