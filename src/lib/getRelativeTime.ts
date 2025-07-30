export function getRelativeTime(date: Date | number): string {
  const now = new Date();
  const inputDate = typeof date === "number" ? new Date(date) : date;

  const diff = now.getTime() - inputDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  if (days >= 2) {
    // Affiche la date exacte si plus de 2 jours
    return inputDate.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (seconds < 60) return "à l’instant";
  if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? "s" : ""}`;
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  return `il y a ${days} jour${days > 1 ? "s" : ""}`;
}
