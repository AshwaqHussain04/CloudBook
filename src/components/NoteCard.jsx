import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import "../styles/NoteCard.css";

const NoteCard = ({ note }) => {
  const context = useContext(noteContext);
  const { delNote, editNote } = context;
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title || "",
    description: note.description || "",
    importance: note.importance || 2,
  });

  const getImportanceColor = (importance) => {
    if (importance >= 4) return "#ff6b6b";
    if (importance >= 3) return "#ffa94d";
    if (importance >= 2) return "#ffd43b";
    return "#69db7c";
  };

  const getImportanceLabel = (importance) => {
    if (importance >= 4) return "Critical";
    if (importance >= 3) return "High";
    if (importance >= 2) return "Medium";
    return "Low";
  };

  const truncateText = (text, length) => {
    return text && text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleEditClick = () => {
    setEditData({
      title: note.title || "",
      description: note.description || "",
      importance: note.importance || 2,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "importance" ? parseInt(value) : value,
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    if (editData.title.length < 5 || editData.description.length < 5) {
      alert("Title and description must be at least 5 characters long");
      return;
    }

    try {
      await editNote(
        note._id,
        editData.title,
        editData.description,
        editData.importance
      );
      setShowEditModal(false);
      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note");
    }
  };

  return (
    <>
      <div
        className="note-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="note-card-header">
          <div className="note-card-title">{truncateText(note.title, 30)}</div>
          <div
            className="importance-badge"
            style={{ backgroundColor: getImportanceColor(note.importance) }}
            title={getImportanceLabel(note.importance)}
          >
            {getImportanceLabel(note.importance)}
          </div>
        </div>

        <div className="note-card-body">
          <p className="note-card-description">
            {truncateText(note.description, 80)}
          </p>
        </div>

        {isHovered && (
          <div className="note-card-actions">
            <button
              className="btn btn-sm btn-primary action-btn"
              onClick={handleEditClick}
              title="Edit note"
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-sm btn-danger action-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this note?")) {
                  delNote(note._id);
                }
              }}
              title="Delete note"
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <div className="note-card-footer">
          <small className="text-muted">
            {new Date(note.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </small>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>✏️ Edit Note</h3>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="edit-form">
              <div className="edit-form-group">
                <label htmlFor="edit-title" className="edit-form-label">
                  📌 Title
                </label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  className="edit-form-control"
                  value={editData.title}
                  onChange={handleEditChange}
                  placeholder="Enter note title"
                  minLength={5}
                  required
                />
                <small className="edit-form-text">
                  {editData.title.length}/100 characters
                </small>
              </div>

              <div className="edit-form-group">
                <label htmlFor="edit-description" className="edit-form-label">
                  ✍️ Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  className="edit-form-control"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Enter note description"
                  minLength={5}
                  rows={5}
                  required
                />
                <small className="edit-form-text">
                  {editData.description.length}/500 characters
                </small>
              </div>

              <div className="edit-form-group">
                <label htmlFor="edit-importance" className="edit-form-label">
                  ⭐ Importance Level
                </label>
                <div className="edit-importance-selector">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`edit-importance-btn ${
                        editData.importance === level ? "active" : ""
                      }`}
                      onClick={() =>
                        setEditData((prev) => ({ ...prev, importance: level }))
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
                <small className="edit-importance-label">
                  Level: {editData.importance}
                </small>
              </div>

              <div className="edit-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    editData.title.length < 5 || editData.description.length < 5
                  }
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
