import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/notesSlice";
import { marked } from "marked";
/**
 * Zeigt eine Liste von Notizen an und ermöglicht das Löschen oder Bearbeiten oder Filtern.
 *
 * @param {object} props - Eigenschaften der Komponente.
 * @param {function(object): void} props.onEdit - Callback-Funktion, wenn eine Notiz zum Bearbeiten ausgewählt wird.
 * @returns {JSX.Element} Eine Liste von Notizen mit Optionen Löschen und Bearbeiten.
 */

function NoteList({ onEdit }) {
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

  /**
   * Berechnet die verbleibende Zeit bis zur Deadline in einem lesbaren Format.
   *
   * @param {string|Date} deadline - Ein Datum/Zeitpunkt.
   * @returns {string} - z. B. "2T 3h 15m verbleibend"
   */
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
    </>
  );
}

export default NoteList;
