/**
 * Berechnet die verbleibende Zeit bis zur Deadline als menschenlesbarer String.
 *
 * @param {string|Date} deadline - Das Datum/Zeit der Deadline.
 * @returns {string} Der Text mit verbleibender Zeit.
 */
export function getRemainingTime(deadline) {
  const now = new Date().getTime();
  const diff = new Date(deadline).getTime() - now;

  if (diff <= 0) {
    return "⛔ Nicht mehr aktuell";
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const remainingHours = totalHours % 24;
  const remainingMinutes = totalMinutes % 60;

  let result = "";

  if (totalDays > 0) result += `${totalDays}T `;
  if (totalDays > 0 || remainingHours > 0) result += `${remainingHours}h `;
  result += `${remainingMinutes}m verbleibend`;

  if (totalDays === 0 && remainingHours === 0 && remainingMinutes === 0) {
    return "Weniger als 1m verbleibend";
  }

  return result.trim();
}
