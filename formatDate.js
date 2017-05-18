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
        throw new Error("На входе должен быть один аргумент")
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
	const time = pad(date.getHours()) + ":" + pad(date.getMinutes());
    if (today.toDateString() === inputDate.toDateString()) {
        return time;
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return "вчера в " + time;
    }
    if (date.getFullYear() === today.getFullYear()) {
        return date.getDate() + " " + MONTHS[date.getMonth()] + " в " + time;
    }
    else {
        return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear() + 
        " года в " + time;
    }
}

function pad(time) {
    return ('0' + time).slice(-2);
}

module.exports = formatDate;
