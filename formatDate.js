const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function getHoursAndMinutes(date) {
  return `${formatDateZeros(date.getHours())}:${formatDateZeros(date.getMinutes())}`
}

function getDayAndMonths(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`
}

function formatDateZeros(timeNumber) {
  return timeNumber < 10 ? '0' + timeNumber : timeNumber;
}

function isEquals(dateNow, date, method) {
  return dateNow[method]() === date[method]()
}

function isYesterday(nowDate, date) {
  const yesterdayDay = new Date();
  yesterdayDay.setDate(nowDate.getDate() - 1);
  return isEquals(date, yesterdayDay, 'getDate') && isEquals(date, yesterdayDay, 'getFullYear')
      && isEquals(date, yesterdayDay, 'getMonth');
}

function formatDate(date) {
  const nowDate = new Date()
  if (date.toDateString() == nowDate.toDateString()) {
    return getHoursAndMinutes(date)
  }
  if (isYesterday(nowDate, date)) {
    return `вчера в ${getHoursAndMinutes(date)}`
  }
  if (isEquals(nowDate, date, 'getFullYear')) {
    return `${getDayAndMonths(date)} в ${getHoursAndMinutes(date)}`;
  } else {
    return `${getDayAndMonths(date)} ${date.getFullYear()} года в ${getHoursAndMinutes(date)}`
  }
}

module.exports = formatDate;
