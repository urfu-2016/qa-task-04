const moment = require('moment');
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

function formatDate(date) {
    if (typeof date !== 'string')
        throw new Error('Аргумент должен быть строкой!')

    if (new Date(date) == 'Invalid Date')
        throw new Error('Аргумент должен быть в формате даты!')

    const countDiffDays = moment().diff(moment(date), 'days')

    if (countDiffDays < 0)
        throw new Error('Дата не может быть в будущем времени!')

    if (countDiffDays === 0)
        return moment(date).format('HH:mm')

    if (countDiffDays === 1)
        return 'вчера в ' + moment(date).format('HH:mm')

    if (countDiffDays >= 1 && countDiffDays < 366)
        return moment(date).format('DD') + ' ' + MONTHS[+moment(date).format('M') -1] + ' в ' + moment(date).format('HH:mm')

    return moment(date).format('DD') + ' ' + MONTHS[+moment(date).format('M') - 1] + ' ' + moment(date).format('YYYY') + ' года в ' + moment(date).utc().format('HH:mm')
}

formatDate('2016-03-25T16:09:10.609Z')

module.exports = formatDate;
