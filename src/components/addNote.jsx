import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);

  const { addNote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    importance: "",
  });

  const handleonclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, parseInt(note.importance, 10));
    setnote({ title: "", description: "", importance: "" });
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Enter Your Note Here </h1>
      <form>
        <div>
          <label htmlFor="noteTitle" className="form-label mt-4">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="noteTitle"
            placeholder="Enter Note Title"
            onChange={onchange}
            minLength={5}
            required
            value={note.title}
            />
        </div>
        <div>
          <label htmlFor="noteDescription" className="form-label mt-4">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="noteDescription"
            placeholder="Enter Description"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div>
          <label htmlFor="noteImportance" className="form-label mt-4">
            Importance
          </label>
          <select
            className="form-select"
            name="importance"
            id="noteImportance"
            onChange={onchange}
            minLength={5}
            required
            value={note.importance}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button
            type="button"
            className="btn btn-outline-primary my-3"
            onClick={handleonclick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
