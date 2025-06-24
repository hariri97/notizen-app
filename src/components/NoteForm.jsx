import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../features/notes/notesSlice";
import CategorySelector from "./CategorySelector";

/**
 * Formular zum Erstellen oder Bearbeiten einer Notiz.
 *
 * @param {object} props - Eigenschaften der Komponente.
 * @param {object} [props.editingNote] - Die Notiz, die bearbeitet werden soll.
 * @param {function(): void} [props.onSave] - Callback-Funktion, der nach dem Speichern einer Notiz aufgerufen wird.
 * @returns {JSX.Element} Formular zur Eingabe und Bearbeitung von Notizen.
 */

function NoteForm({ editingNote, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Allgemein");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category || "Allgemein");
      setDeadline(editingNote.deadline || "");
    }
  }, [editingNote]);

  /**
   * Verarbeitet das Absenden des Notizformulars
   * @param {Event} e DOM-Ereignis was durch senden ausgelöst wird
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return alert("Bitte Titel und Inhalt ausfüllen.");

    if (editingNote) {
      dispatch(
        editNote({ id: editingNote.id, title, content, category, deadline })
      );
      onSave && onSave();
    } else {
      dispatch(addNote({ id: Date.now(), title, content, category, deadline }));
    }

    setTitle("");
    setContent("");
    setCategory("Allgemein");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="note_form">
      <h2>{editingNote ? "Notiz bearbeiten" : "Neue Notiz"}</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titel"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="Inhalt"
      />
      <CategorySelector value={category} onChange={setCategory} />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <br />
      <button type="submit">{editingNote ? "Speichern" : "Hinzufügen"}</button>
    </form>
  );
}

export default NoteForm;
