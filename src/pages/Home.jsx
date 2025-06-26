import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import NotesPreview from "../components/NotesPreview";
/**
 * Die Hauptkomponente der Notizen-App, die Notizliste anzeigt.
 * Verwaltet den Zustand der zu bearbeitenden Notiz und erstellt Erinnerungen für Deadlines.
 *
 * @returns {JSX.Element} Die Hauptansicht der App.
 */
function Home() {
  const notes = useSelector((state) => state.notes.notes);

  const [noteToEdit, setNoteToEdit] = useState(null);
  const [previewNoteId, setPreviewNoteId] = useState(null);

  const openPreview = (note) => {
    setPreviewNoteId(note.id);
  };

  const closePreview = () => {
    setPreviewNoteId(null);
  };

  const switchPreview = (direction) => {
    const index = notes.findIndex((n) => n.id === previewNoteId);
    const nextIndex = direction === "next" ? index + 1 : index - 1;
    if (nextIndex >= 0 && nextIndex < notes.length) {
      setPreviewNoteId(notes[nextIndex].id);
    }
  };

  useEffect(() => {
    if (previewNoteId) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [previewNoteId]);

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
      <NoteList onEdit={setNoteToEdit} onPreview={openPreview} />

      {previewNoteId && (
        <NotesPreview
          notes={notes}
          currentId={previewNoteId}
          onClose={closePreview}
          onSwitch={switchPreview}
        />
      )}
    </>
  );
}

export default Home;
