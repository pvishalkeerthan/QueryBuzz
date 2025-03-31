import React, { useState } from "react";
import styles from "./Notepad.module.css";

const Notepad = () => {
  const [notes, setNotes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleAddNote = () => {
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      color,
      createdAt: new Date().toLocaleString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setTitle("");
    setContent("");
    setColor("#ffffff");
    setIsFormVisible(false);
  };

  const handleDeleteNote = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>My Notes</h2>
        <button onClick={() => setIsFormVisible((prev) => !prev)} className={styles.addButton}>
          Add Note
        </button>
      </div>

      {isFormVisible && (
        <div className={styles.formContainer}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorPicker}
          />
          <div className={styles.formActions}>
            <button onClick={handleAddNote} className={styles.saveButton}>
              Save Note
            </button>
            <button onClick={() => setIsFormVisible(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.notesContainer}>
        {notes.map((note) => (
          <div
            key={note.id}
            className={styles.note}
            style={{
              "--note-border-color": note.color,
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className={styles.footer}>
              <p className={styles.date}>{note.createdAt}</p>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notepad;
