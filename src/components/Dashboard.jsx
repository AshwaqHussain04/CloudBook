import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteDisplay from "./noteDisplay";
import AddNoteEnhanced from "./AddNoteEnhanced";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const notesCount = notes.length;
  const importantNotes = notes.filter((note) => note.importance >= 3).length;
  const completedNotes = notes.filter((note) => note.completed).length;

  return (
    <div className="dashboard-container mt-5">
      <div className="dashboard-header mb-5">
        <h1 className="dashboard-title">📚 My Notes Dashboard</h1>
        <p className="dashboard-subtitle">Organize and manage your thoughts</p>
      </div>

      {/* Stats Row */}
      <div className="row mb-5">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h5>Total Notes</h5>
              <p className="stat-number">{notesCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h5>Important</h5>
              <p className="stat-number">{importantNotes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h5>Completed</h5>
              <p className="stat-number">{completedNotes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h5>Progress</h5>
              <p className="stat-number">
                {notesCount > 0
                  ? Math.round((completedNotes / notesCount) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Button */}
      <div className="row mb-4">
        <div className="col-12">
          <AddNoteEnhanced />
        </div>
      </div>

      {/* Notes Display */}
      <div className="row">
        <div className="col-12">
          <NoteDisplay />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
