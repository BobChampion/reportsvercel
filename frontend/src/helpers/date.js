let getDate = (date) => {
  // Create a new Date object from the original date string
  let dateObj = new Date(date);

  // Round the date to the nearest hour
  dateObj.setMinutes(0);
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  dateObj.setHours(dateObj.getHours() + Math.round(dateObj.getMinutes() / 60));

  // Convert the date to UTC format and remove seconds and milliseconds
  let formattedDate = dateObj.toISOString().slice(0, -5) + 'Z';
  return formattedDate;
};

export let getTodayDate = (startOrEnd) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  let formattedDate;
  if (startOrEnd === 'start') {
    formattedDate = `${year}-${month}-${day}T00:00:00`;
  } else if (startOrEnd === 'end') {
    formattedDate = `${year}-${month}-${day}T23:59:59`;
  }

  return formattedDate;
};

export default getDate;
