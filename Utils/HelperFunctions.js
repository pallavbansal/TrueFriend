export const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
  return currentTime;
};

export const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const formattedDate = `${date}/${month}/${year}`;
  return formattedDate;
};
