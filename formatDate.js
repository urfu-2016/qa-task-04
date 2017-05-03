'use strict';

const months = ['января', 'февраля', 'марта', 'апреля', 'мая',
    'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function formatDate(date) {
    if (!(date instanceof Date)) {
        throw new TypeError('date should be Date');
    }
    if (date.toString() === 'Invalid Date') {
        throw new Error('date should be correct');
    }
    let currentDate = new Date();
    if (date > currentDate) {
        throw new Error('date should not be greater than current date');
    }
    let dateDate = date.getUTCDate();
    let dateMonth = date.getUTCMonth();
    let dateHours = getFormattedNumber(date.getUTCHours());
    let dateMinutes = getFormattedNumber(date.getMinutes());
    if (date.getUTCFullYear() !== currentDate.getUTCFullYear()) {
        return `${dateDate} ${months[dateMonth]} ${date.getUTCFullYear()} года в ${dateHours}:${dateMinutes}`;
    }
    if (currentDate.getUTCDate() === dateDate && currentDate.getUTCMonth() === dateMonth) {
        return `${dateHours}:${dateMinutes}`;
    }
    if (currentDate.getUTCMonth() === dateMonth && currentDate.getUTCDate() === dateDate + 1) {
        return `вчера в ${dateHours}:${dateMinutes}`;
    }

    return `${dateDate} ${months[dateMonth]} в ${dateHours}:${dateMinutes}`;
}

function getFormattedNumber(num) {
    if (num < 0) {
        throw new Error('num should be greater than 0');
    }
    return num < 10 ? `0${num}` : num.toString();
}

module.exports = formatDate;
