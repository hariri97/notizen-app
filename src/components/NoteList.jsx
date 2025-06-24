import React, { useEffect, useState } from "react";
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
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000); // jede minute aktualisieren
    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (deadline) => {
    const now = new Date().getTime();
    const diff = new Date(deadline).getTime() - now;

    if (diff <= 0) {
      return "⛔ Nicht mehr Aktuell";
    }

    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const remainingHours = totalHours % 24;
    const remainingMinutes = totalMinutes % 60;

    let result = "";

    if (totalDays > 0) {
      result += `${totalDays}T `;
    }
    if (remainingHours > 0 || totalDays > 0) {
      result += `${remainingHours}h `;
    }
    result += `${remainingMinutes}m verbleibend`;

    if (totalDays === 0 && remainingHours === 0 && remainingMinutes === 0) {
      return "Weniger als 1m verbleibend";
    }

    return result.trim();
  };

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
                <hr />⏳ {getRemainingTime(note.deadline)}
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
