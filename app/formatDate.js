'use strict';

const MONTHS = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

/**
 * Function transform `pastDate` to:
 *  'HH:MM' - if `pastDate` is today,
 *  'вчера в HH:MM' - if `pastDate` is yesterday,
 *  'D МЕСЯЦА в HH:MM' - if `pastDate` in this year,
 *  'D МЕСЯЦА YYYY года в HH:MM' - if `pastDate` in last year 
 * 
 * @param {Date} date - this date will be formatted
 * @return {String} formating date
 */
function formatDate(pastDate) {
    if (!(pastDate instanceof Date)) {
        throw new TypeError('`pastDate` should has type Date');
    }

    if (pastDate.toString() === 'Invalid Date') {
        throw new Error('`pastDate` should be valid');
    }

    const currentDate = new Date();
    if (pastDate > currentDate) {
        throw new Error('`pastDate` should be less then current date');
    }

    const time = getFormattedTime(pastDate);
    const date = getFormattedDate(pastDate);
    const year = pastDate.getFullYear();

    return isSameDays(pastDate, currentDate) ? time :
           isSameDays(pastDate, subDays(currentDate, 1)) ? `вчера в ${time}`:
           isSameYears(pastDate, currentDate) ? `${date} в ${time}`:
           `${date} ${year} года в ${time}`;
}

function getFormattedTime(date) {
    return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

function getFormattedDate(date) {
    return `${date.getDate() + 1} ${MONTHS[date.getMonth()]}`;
}

function isSameDays(first, second) {
    return first.toDateString() == second.toDateString();
}

function isSameYears(first, second) {
    return first.getFullYear() == second.getFullYear();
}

function subDays(date, subtrahendDays) {
    var resultDate = new Date(date);
    resultDate.setDate(date.getDate() - subtrahendDays);
    return resultDate;
}

function padZero(timeComponent) {
    return ('0' + timeComponent).slice(-2);
}

module.exports = formatDate;
