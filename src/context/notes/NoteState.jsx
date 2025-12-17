import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const url = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];

  // Helper function to get token and validate
  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No authentication token found in localStorage");
      return null;
    }
    return token;
  };

  //API Call to fetch all notes from database
  const getNotes = async () => {
    const token = getAuthToken();
    if (!token) {
      console.error("Cannot fetch notes: No authentication token");
      return;
    }

    try {
      const response = await fetch(`${url}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
      });

      if (!response.ok) {
        console.error("Error fetching notes:", response.status);
        return;
      }

      const json = await response.json();
      setnotes(json);
      console.log("Notes fetched successfully.");
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const [notes, setnotes] = useState(notesInitial);

  //function to Add a note
  const addNote = async (title, description, importance) => {
    const token = getAuthToken();
    if (!token) {
      console.error("Cannot add note: No authentication token");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/postnotes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: token,
          },
          body: JSON.stringify({ title, description, importance }),
        }
      );

      if (!response.ok) {
        console.error("Error adding note:", response.status);
        return;
      }

      const note = await response.json();
      setnotes([...notes, note]);
      console.log("Note added successfully");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  //function to Delete a note
  const delNote = async (id) => {
    const token = getAuthToken();
    if (!token) {
      console.error("Cannot delete note: No authentication token");
      return;
    }

    try {
      const response = await fetch(`${url}/api/notes/removenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
      });

      if (!response.ok) {
        console.error("Error deleting note:", response.status);
        return;
      }

      console.log("Deleting the note with id: " + id);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setnotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  //function to Edit a note
  const editNote = async (id, title, description, importance) => {
    const token = getAuthToken();
    if (!token) {
      console.error("Cannot edit note: No authentication token");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/updatenotes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authtoken: token,
          },
          body: JSON.stringify({
            id: id,
            title: title,
            description: description,
            importance: Number(importance),
          }),
        }
      );

      if (!response.ok) {
        console.error("Error updating note:", response.status);
        return;
      }

      let newNotes = JSON.parse(JSON.stringify(notes));
      //Logic to edit in Client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].importance = importance;
          break;
        }
      }
      setnotes(newNotes);
      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, delNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
