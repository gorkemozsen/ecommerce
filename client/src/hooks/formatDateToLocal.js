export function formatDateToLocal(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", ""); // Virgül kaldırılır
}
