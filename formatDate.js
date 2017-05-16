'use strict';

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
];

/**
 * Приводит дату к нужному формату
 * @param {String} date
 */
function formatDate(date) {
    const currentMoment = new Date();
    const dateFromString = new Date(date);
    if (dateFromString.toString() === 'Invalid Date') {
        throw new Error('Неверный формат даты');
    }
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const yesterday = (date => new Date(date.setDate(date.getDate() - 1)))(new Date);
    if (dateFromString  > currentMoment) {
        throw new Error('Дата ещё не нступила');
    } else if (dateFromString >= today) {
        return getHoursAndMinutes(dateFromString);
    } else if (dateFromString >= yesterday) {
        return 'вчера в ' + getHoursAndMinutes(dateFromString);
    } else if (currentMoment.getYear() === dateFromString.getYear()) {
        return dateFromString.getDate() + ' ' + MONTHS[dateFromString.getMonth()] +
            ' в ' + getHoursAndMinutes(dateFromString);
    }
    return dateFromString.getDate() + ' ' + MONTHS[dateFromString.getMonth()] +
                ' ' + dateFromString.getFullYear() + ' года в ' +
                getHoursAndMinutes(dateFromString);
}

// Структура для кэширования значения, возвращаемого getHoursAndMinutes
const cache = {};

/**
 * Возвращает представление даты в часах и минутах
 * @param {Date} date
 */
function getHoursAndMinutes(date) {
    if (cache.hasOwnProperty(date)) {
        return cache[date];
    } else {
        const result = (date.getHours() > 9 ?
                date.getHours() : '0' +
                date.getHours()) + ':' +
            (date.getMinutes() > 9 ?
                date.getMinutes() : '0' +
                date.getMinutes());
        cache[date] = result;
        return result;
    }
}

module.exports = formatDate;
