import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/NoteContext";
import "../styles/AddNoteEnhanced.css";

const AddNoteEnhanced = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    importance: "2",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  const handleonclick = (e) => {
    e.preventDefault();
    if (note.title.length >= 5 && note.description.length >= 5) {
      addNote(note.title, note.description, parseInt(note.importance, 10));
      setnote({ title: "", description: "", importance: "2" });
      setIsFormOpen(false);
      // Show success feedback
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.display = "block";
        }
      }, 100);
    }
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const isFormValid = note.title.length >= 5 && note.description.length >= 5;

  return (
    <div className="add-note-container">
      {!isFormOpen ? (
        <div className="add-note-trigger">
          <button
            className="btn btn-lg add-note-btn"
            onClick={() => setIsFormOpen(true)}
            title="Add a new note"
          >
            <span className="add-icon">+</span>
            <span className="btn-text">Add New Note</span>
          </button>
        </div>
      ) : (
        <div className="add-note-form-container" ref={formRef}>
          <div className="add-note-form">
            <div className="form-header">
              <h3>📝 Create New Note</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setIsFormOpen(false)}
                title="Close form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleonclick}>
              <div className="form-group">
                <label htmlFor="noteTitle" className="form-label">
                  📌 Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="noteTitle"
                  placeholder="What's on your mind?"
                  onChange={onchange}
                  minLength={5}
                  required
                  value={note.title}
                  maxLength={100}
                />
                <small className="form-text">
                  {note.title.length}/100 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="noteDescription" className="form-label">
                  ✍️ Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="noteDescription"
                  placeholder="Add more details..."
                  onChange={onchange}
                  minLength={5}
                  required
                  value={note.description}
                  rows={5}
                  maxLength={500}
                />
                <small className="form-text">
                  {note.description.length}/500 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="noteImportance" className="form-label">
                  ⭐ Importance Level
                </label>
                <div className="importance-selector">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`importance-btn ${
                        parseInt(note.importance) === level ? "active" : ""
                      }`}
                      onClick={() =>
                        setnote({ ...note, importance: level.toString() })
                      }
                      title={
                        level === 5
                          ? "Critical"
                          : level === 4
                          ? "High"
                          : level === 3
                          ? "Medium"
                          : level === 2
                          ? "Low"
                          : "Very Low"
                      }
                    >
                      {"★".repeat(level)}
                    </button>
                  ))}
                </div>
                <small className="importance-label">
                  Level: {parseInt(note.importance)}
                </small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsFormOpen(false);
                    setnote({ title: "", description: "", importance: "2" });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormValid}
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNoteEnhanced;
