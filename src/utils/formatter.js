export function formatDate(date) {
  if (!date) return "";
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return `${year}/${month}/${day}`;
}

export function formatFormDate(date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const paddedMonth = month < 10 ? `0${month}` : month;
  const paddedDay = day < 10 ? `0${day}` : day;

  return `${year}-${paddedMonth}-${paddedDay}`;
}