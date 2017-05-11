const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая','июня', 'июля',
                'августа', 'сентября','октября', 'ноября', 'декабря']

function formatDate(date) {
  const newDate = new Date();
  if (arguments.length !== 1)
    throw new Error('Неверное число аргументов');
  var dateFormat = new Date(date);
  if (dateFormat.toString() === 'Invalid Date')
    throw new Error('Переданный аргумент не формата Date');
  if (newDate < dateFormat)
    throw new Error('Дата должна быть до текущей даты');
	const newTime = `${dateFormat.getHours()}:${dateFormat.getMinutes()}`;
	const newDay = `${dateFormat.getDate()} ${MONTHS[dateFormat.getMonth()-1]}`;

  if (dateFormat.toDateString() == newDate.toDateString())
    return newTime;
  if (isYesterday(newDate, dateFormat))
    return `вчера в ${newTime}`;
  if (newDate.getFullYear() === dateFormat.getFullYear())
    return `${newDay} в ${newTime}`;

  return `${newDay} ${dateFormat.getFullYear()} года в ${newTime}`;
}

function isYesterday(newDate, date) {
  const yesterdayDay = new Date();
  yesterdayDay.setDate(newDate.getDate() - 1);
  return yesterdayDay.toDateString() == date.toDateString();
}

module.exports = formatDate;
