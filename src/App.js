import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Select Category",
    "General",
    "Work",
    "Personal",
    "Ideas",
  ];

  // Load saved notes safely
  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setNotes(parsed);
      } catch (e) {
        console.error("Error loading saved notes:", e);
      }
    }
  }, []);

  // Save notes on every update
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    if (editIndex !== null) {
      const updated = notes.map((n, i) => (i === editIndex ? note : n));
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);
    }
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
  };

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  // Apply category filter
  const filteredNotes =
    filterCategory === "All"
      ? notes
      : notes.filter((note) => note.category === filterCategory);

  return (
    <div className="App">
      <h1 className="text-4xl text-red-500">📝 My Notes App</h1>
      <NoteForm
        addNote={addNote}
        editIndex={editIndex}
        currentNote={editIndex !== null ? notes[editIndex].text : ""}
        currentCategory={editIndex !== null ? notes[editIndex].category : ""}
        categories={categories}
        filterCategory={filterCategory}
        handleFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <NoteList
        notes={filteredNotes}
        deleteNote={deleteNote}
        startEdit={startEdit}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default App;
