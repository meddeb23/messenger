const timeFormater = (time) => {
  const date = new Date(time);
  return `${(0 + date.getHours().toString()).slice(-2)}:${(
    0 + date.getMinutes().toString()
  ).slice(-2)}`;
};

export { timeFormater };
