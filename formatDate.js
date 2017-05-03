const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая','июня', 'июля',
                'августа', 'сентября','октября', 'ноября', 'декабря']

function formatDate(date) {
   const newDate = new Date();
  if (arguments.length !== 1)
	throw new Error('Неверное число аргументов');
  if (date.toString() === 'Invalid Date')
	throw new Error('Переданный аргумент не формата Date');
  if (newDate < date)
	throw new Error('Дата должна быть до текущей даты');
	const newTime = `${date.getHours()}:${date.getMinutes()}`;
	const newDay =	`${date.getDate()} ${MONTHS[date.getMonth()-1]}`;
	const newDayWithYear = `${newDay} ${date.getFullYear()} года в ${newTime}`;

  if (date.toDateString() == newDate.toDateString())
	return newTime;
  if (isYesterday(newDate, date))
	return `вчера в ${newTime}`;
  if (newDate.getFullYear() === date.getFullYear())
	return `${newDay} в ${newTime}`;

  return newDayWithYear;
}

function isYesterday(newDate, date) {
  const yesterdayDay = new Date();
  yesterdayDay.setDate(newDate.getDate() - 1);
  return yesterdayDay.toDateString() == date.toDateString();
}

module.exports = formatDate;
