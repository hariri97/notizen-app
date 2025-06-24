import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
/**
 * Die Hauptkomponente der Notizen-App, die Notizliste anzeigt.
 * Verwaltet den Zustand der zu bearbeitenden Notiz und erstellt Erinnerungen für Deadlines.
 *
 * @returns {JSX.Element} Die Hauptansicht der App.
 */
function Home() {
  const [noteToEdit, setNoteToEdit] = useState(null);

  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const timeouts = [];

    notes.forEach((note) => {
      if (note.deadline) {
        const alertTime = new Date(note.deadline).getTime() - 30 * 60 * 1000;
        const now = Date.now();

        if (alertTime > now) {
          const timeout = setTimeout(() => {
            alert(`⏰ Erinnerung: Deadline für "${note.title}" in 30 Minuten!`);
          }, alertTime - now);
          timeouts.push(timeout);
        }
      }
    });

    // Bereinigt alle gesetzten Alerts
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [notes]);

  return (
    <>
      <h1>📝 Notizen App</h1>
      <NoteForm editingNote={noteToEdit} onSave={() => setNoteToEdit(null)} />
      <NoteList onEdit={setNoteToEdit} />
    </>
  );
}

export default Home;
