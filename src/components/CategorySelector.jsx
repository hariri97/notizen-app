import React from "react";

/**
 * Dropdown-Menü - Auswahl der Notizkategorie.
 *
 * @param {object} props - Eigenschaften der Komponente.
 * @param {string} props.value - Der aktuell ausgewählte Wert der Kategorie.
 * @param {function(string): void} props.onChange - Callback-Funktion, wenn sich die Auswahl ändert.
 * @returns {JSX.Element} Dropdown-Menü Kategorien.
 */
function CategorySelector({ value, onChange }) {
  return (
    <div className="category_selector">
      <label>Kategorie: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="Allgemein">Allgemein</option>
        <option value="Arbeit">Arbeit</option>
        <option value="Privat">Privat</option>
        <option value="Wichtig">Wichtig</option>
      </select>
    </div>
  );
}

export default CategorySelector;
