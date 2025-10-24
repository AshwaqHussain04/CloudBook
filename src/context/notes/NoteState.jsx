import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const url = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];
  //API Call to fetch all notes from database
  const getNotes = async () => {
    //API Call to delete a note from the database
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2VmYzQwNDgwZTIyZmNkZDgzOTcxYiIsImlhdCI6MTc1ODY0NTA3M30.xnnv6sGqOY8deZcDMXsO2xqTV1WfPAAOQ9P1EgTij-4",
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  const [notes, setnotes] = useState(notesInitial);

  //function to Add a note
  const addNote = async (title, description, importance) => {
    //API call to POST data into the database
    const response = await fetch("http://localhost:5000/api/notes/postnotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2VmYzQwNDgwZTIyZmNkZDgzOTcxYiIsImlhdCI6MTc1ODY0NTA3M30.xnnv6sGqOY8deZcDMXsO2xqTV1WfPAAOQ9P1EgTij-4",
      },
      body: JSON.stringify({ title, description, importance }),
    });
    const note = await response.json();    
    setnotes([...notes, note]);
  };
  //function to Delete a note
  const delNote = async (id) => {
    // API Call to delete a note from the database
    const response = await fetch(`${url}/api/notes/removenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2VmYzQwNDgwZTIyZmNkZDgzOTcxYiIsImlhdCI6MTc1ODY0NTA3M30.xnnv6sGqOY8deZcDMXsO2xqTV1WfPAAOQ9P1EgTij-4",
      },
    });
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });
    setnotes(newNotes);
  };
  //function to Edit a note
  const editNote = async (id, title, description, importance) => {
    //API call
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenotes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authtoken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2VmYzQwNDgwZTIyZmNkZDgzOTcxYiIsImlhdCI6MTc1ODY0NTA3M30.xnnv6sGqOY8deZcDMXsO2xqTV1WfPAAOQ9P1EgTij-4",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
          importance: Number(importance),
        }),
      }
    );

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].importance = importance;
        break
      }
    }
    setnotes(newNotes);
    
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
