const GetCurrentDate = () => {
  const date = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};



const GetShortCurrentDate = () => {
  const date = new Date();
  const day = ('0' + date.getDate()).slice(-2); // Ensures day is always two digits
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-indexed, so add 1 and ensure it's two digits
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`; // Format as day/month/year
  console.log(formattedDate)
  return formattedDate;
};


// export default GetCurrentDate;

export { GetCurrentDate, GetShortCurrentDate };

