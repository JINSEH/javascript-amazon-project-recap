function isWeekend(date) {
  date = date.format('dddd');
  if (date === 'Saturday' || date === 'Sunday' ) {
    return date;
  }
  else {
    return `${date} is a weekday!`
  }
};

export default isWeekend;