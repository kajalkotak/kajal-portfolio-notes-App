//NoteList.js

import React from "react";

function NoteList({ notes, deleteNote, starEdit }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Work":
        return "#4a90e2"; // Blue
      case "Personal":
        return "#e94e77"; // Pink
      case "Ideas":
        return "#f5a623"; // Orange
      case "General":
      default:
        return "#7ed321"; // Green
    }
  };

  return (
    <div>
      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <strong>{note.text}</strong>
              <br />
              <span
                style={{
                  backgroundColor: getCategoryColor(note.category),
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              >
                {note.category}
              </span>
              <br />
              <div style={{ marginTop: "8px" }}>
                <button onClick={() => starEdit(index)}>✏️ Edit</button>
                <button
                  onClick={() => deleteNote(index)}
                  style={{ marginLeft: "10px" }}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;
