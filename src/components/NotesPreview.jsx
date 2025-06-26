import React from "react";
import { marked } from "marked";
import { getRemainingTime } from "../utils/utils";

function NotesPreview({ notes, currentId, onClose, onSwitch }) {
  const currentIndex = notes.findIndex((n) => n.id === currentId);
  const isLast = currentIndex >= notes.length - 1;
  const isFirst = currentIndex <= 0;
  const note = notes[currentIndex];

  if (!note) return null;

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  return (
    <div className="notes_popup">
      <div className="notes_popup_content">
        <button onClick={onClose} className="notes_popup_close_btn">
          ✖
        </button>

        <h2 className="notes_popup_headline">
          {note.title} <small>{note.category}</small>
        </h2>

        <div
          className="notes_popup_text"
          dangerouslySetInnerHTML={{ __html: marked(note.content) }}
        />

        <p>
          <strong>Erstellt:</strong> {new Date(note.id).toLocaleString()}
        </p>

        {note.deadline && (
          <div className="dead_line">
            <p>📅 Deadline: {new Date(note.deadline).toLocaleString()}</p>
            <hr />
            <p>⏳ {getRemainingTime(note.deadline)}</p>
          </div>
        )}

        <div className="notes_popup_nav">
          <button
            onClick={() => onSwitch("prev")}
            disabled={isFirst}
            style={{ opacity: isFirst ? "0.5" : undefined }}
          >
            ◀
          </button>

          <button
            onClick={() => onSwitch("next")}
            disabled={isLast}
            style={{ opacity: isLast ? "0.5" : undefined }}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesPreview;
