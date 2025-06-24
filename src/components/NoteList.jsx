import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";

/**
 * Zeigt eine Liste von Notizen an und ermöglicht das Löschen oder Bearbeiten.
 *
 * @param {object} props - Eigenschaften der Komponente.
 * @param {function(object): void} props.onEdit - Callback-Funktion, wenn eine Notiz zum Bearbeiten ausgewählt wird.
 * @returns {JSX.Element} Eine Liste von Notizen mit Optionen Löschen und Bearbeiten.
 */

function NoteList({ onEdit }) {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  return (
    <div className="note_list">
      {notes.length === 0 && <p>Keine Notizen vorhanden.</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>
              {note.title} <small>{note.category}</small>
            </h3>
            <p className="note_content">{note.content}</p>
            {note.deadline && (
              <p className="dead_line">
                📅 Deadline: {new Date(note.deadline).toLocaleString()}
              </p>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
