//NoteForm.js

import React, { useState, useEffect } from "react";

function NoteForm({
  addNote,
  editIndex,
  currentNote,
  currentCategory,
  categories,
  filterCategory,
  handleFilterChange,
  searchTerm,
  setSearchTerm,
}) {
  const [noteText, setNoteText] = useState("");
  const [category, setCategory] = useState("Select Category");

  // Prefill input when editing
  useEffect(() => {
    setNoteText(currentNote || "");
    setCategory(currentCategory || "Select Category");
  }, [currentNote, currentCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote = {
      text: noteText,
      category: category,
    };

    addNote(newNote);
    setNoteText("");
    setCategory("General");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="flex items-center mb-5 gap-3 mt-6 flex-wrap w-[600px] mx-auto">
        <label>Filter by Category: </label>
        <select
          value={filterCategory}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "80%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #aaa",
          marginBottom: "15px",
        }}
      ></input>

      <input
        type="text"
        placeholder="Write your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit">
        {editIndex !== null ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;
