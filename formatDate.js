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
  'декабря'
]

function addLeadingZero(num) {
  return num > 9 ? num : '0' + num
}

function makeTime(date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
}

function makeMonthDay(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`
}

function isYesterday(date, today) {
  const diff = today - date
  return (diff > 0 && diff < 86400000)
}

function formatDate(ISODateString) {
  if (typeof ISODateString !== 'string') {
    throw new Error('Argument must be a string');
  }

  const date = new Date(ISODateString)

  if (date.toString() === 'Invalid Date') {
    throw new Error('Argument must be a string in ISO date format')
  }

  const today = new Date()

  if (date.toDateString() == today.toDateString()) {
    return makeTime(date)
  } else if (date.getFullYear() < today.getFullYear()) {
    return `${makeMonthDay(date)} ${date.getFullYear()} года в ${makeTime(date)}`
  } else if (isYesterday(date, today)) {
    return `вчера ${makeTime(date)}`
  } else {
    return `${makeMonthDay(date)} в ${makeTime(date)}`
  }
}

module.exports = formatDate;
