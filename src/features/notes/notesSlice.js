import { createSlice } from "@reduxjs/toolkit";

/**
 * Lädt Notizen aus dem localStorage des Browsers.
 * Wenn keine Notizen gefunden werden, wird ein leeres Array zurückgegeben.
 * @returns {Note[]} Ein Array von Notizobjekten.
 */
const loadNotes = () => {
  const saved = localStorage.getItem("notes");
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  notes: loadNotes(),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    /**
     * Fügt eine neue Notiz hinzu. speichert die aktualisierten Notizen im localStorage.
     * @param {object} state - Der aktuelle Redux-Zustand.
     *
     */
    addNote: (state, action) => {
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    /**
     * Löscht eine Notiz basierend auf ihrer ID. speichert die aktualisierten Notizen im localStorage.
     * @param {object} state - Der aktuelle Redux-Zustand.
     *
     */
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    /**
     * Aktualisiert die Details einer bestehenden Notiz anhand ihrer ID. speichert die aktualisierten Notizen im localStorage.
     * @param {object} state - Der aktuelle Redux-Zustand.
     *
     */
    editNote: (state, action) => {
      const { id, title, content, category, deadline } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
        existingNote.category = category;
        existingNote.deadline = deadline;
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
  },
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;
