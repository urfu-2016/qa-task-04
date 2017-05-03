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
    let dateDate = date.getDate();
    let dateMonth = date.getMonth();
    let dateHours = getFormattedNumber(date.getHours());
    let dateMinutes = getFormattedNumber(date.getMinutes());
    if (date.getFullYear() !== currentDate.getFullYear()) {
        return `${dateDate} ${months[dateMonth]} ${date.getFullYear()} года в ${dateHours}:${dateMinutes}`;
    }
    if (currentDate.getDate() === dateDate && currentDate.getMonth() === dateMonth) {
        return `${dateHours}:${dateMinutes}`;
    }
    if (currentDate.getMonth() === dateMonth && currentDate.getDate() === dateDate + 1) {
        return `вчера в ${dateHours}:${dateMinutes}`;
    }

    return `${dateDate} ${months[dateMonth]} в ${dateHours}:${dateMinutes}`;
}

function getFormattedNumber(num) {
    return num < 10 ? `0${num}` : num.toString();
}

module.exports = formatDate;
