export const formatDate = (dateString) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  return `${month} ${day}`;
};
