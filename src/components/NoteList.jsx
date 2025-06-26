import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import { marked } from "marked";
import { getRemainingTime } from "../utils/utils";
/**
 * Zeigt eine Liste von Notizen an und ermöglicht das Löschen oder Bearbeiten oder Filtern.
 *
 * @param {object} props - Eigenschaften der Komponente.
 * @param {function(object): void} props.onEdit - Callback-Funktion, wenn eine Notiz zum Bearbeiten ausgewählt wird.
 * @returns {JSX.Element} Eine Liste von Notizen mit Optionen Löschen und Bearbeiten.
 */

function NoteList({ onEdit, onPreview }) {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [now, setNow] = useState(Date.now());
  const [filterCategory, setFilterCategory] = useState("Alle");

  const filteredNotes =
    filterCategory === "Alle"
      ? notes
      : notes.filter((note) => note.category === filterCategory);

  const categories = ["Alle", "Allgemein", "Arbeit", "Privat", "Wichtig"];

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000); // jede minute aktualisieren
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="cat_filter">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setFilterCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="note_list">
        {filteredNotes.length === 0 && <p>Keine Notizen vorhanden.</p>}
        <ul>
          {filteredNotes.map((note) => (
            <li key={note.id}>
              <h3>
                {note.title} <small>{note.category}</small>
              </h3>

              <div
                className="note_content"
                dangerouslySetInnerHTML={{
                  __html: marked(note.content || ""),
                }}
              />

              {note.deadline && (
                <div className="dead_line">
                  <p>📅 Deadline: {new Date(note.deadline).toLocaleString()}</p>
                  <hr />
                  <p>⏳ {getRemainingTime(note.deadline)}</p>
                </div>
              )}
              <div className="btn_container">
                <button
                  onClick={() => dispatch(deleteNote(note.id))}
                  className="del_btn"
                >
                  Löschen
                </button>{" "}
                <button onClick={() => onEdit(note)} className="edit_btn">
                  Bearbeiten
                </button>
                <button onClick={() => onPreview(note)} className="preview_btn">
                  Anschauen
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NoteList;
