import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteDisplay from "./noteDisplay";
import AddNote from "./addNote";

const Note = () => {
  const context = useContext(noteContext);
  const { notes, addNote, delNote, editNote, getNotes } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    getNotes();
  }, []);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    eimportance: "",
  });

  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title || " ",
      edescription: currentNote.description || " ",
      eimportance: currentNote.importance || " ",
    });
  };
  const handleonclick = (e) => {
    e.preventDefault();

    if (!note.id) {
      console.error("Cannot update note: ID is missing!");
      return;
    }
    editNote(
      note.id,
      note.etitle,
      note.edescription,
      parseInt(note.eimportance, 10)
    );
    console.log("Note updated:", note);
    refClose.current.click();
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label htmlFor="noteTitle" className="form-label mt-4">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="enoteTitle"
                    value={note.etitle}
                    placeholder="Enter Note Title"
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="noteDescription" className="form-label mt-4">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="edescription"
                    id="enoteDescription"
                    value={note.edescription}
                    placeholder="Enter Description"
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="noteImportance" className="form-label mt-4">
                    Importance
                  </label>
                  <select
                    className="form-select"
                    id="enoteImportance"
                    name="eimportance"
                    value={note.eimportance || ""}
                    onChange={onchange}
                    required
                  >
                    <option value="">Select importance</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleonclick}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes Are Here</h1>
        {notes.map((note, index) => {
          return (
            <NoteDisplay
              key={index}
              updatenote={updatenote}
              note={note}
              number={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default Note;
