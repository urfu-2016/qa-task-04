'use strict';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
     'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    const inputDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (arguments.length !== 1) {
        throw new Error("На входе должен быть один аргумент типа Date")
    }
    if (!(date instanceof Date)) {
        throw new Error('Аргумент должен быть типа Date');
    }
    if (inputDate.toString() === 'Invalid Date') {
        throw new Error('Неправильный формат даты');
    }
    if (date > today) {
        throw new Error('Дата не должна быть больше текущей');
    }
    if (today.toDateString() === inputDate.toDateString()) {
        return getTimeWithZero(date.getHours()) + ":" + getTimeWithZero(date.getMinutes());
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return "вчера в " + getTimeWithZero(date.getHours()) + ":" + getTimeWithZero(date.getMinutes());
    }
    if (date.getFullYear() === today.getFullYear()) {
        return date.getDate() + " " + MONTHS[date.getMonth()] + " в " + getTimeWithZero(date.getHours()) +
        ":" + getTimeWithZero(date.getMinutes());
    }
    else {
        return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear() + 
        " года в " + getTimeWithZero(date.getHours()) + ":" + getTimeWithZero(date.getMinutes());
    }
}

function getTimeWithZero(time) {
    if (time < 10) 
        return '0' + time;
    else return time;
}

module.exports = formatDate;
