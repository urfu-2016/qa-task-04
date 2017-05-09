'use strict';

const assert = require('assert');

const getCurrentDate = require('./getCurrentDate');

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

function formatDate(inputDateString) {
    const date = new Date(inputDateString);

    const currentDate = getCurrentDate();

    let timeString = `${leftPad(date.getUTCHours())}:${leftPad(date.getUTCMinutes())}`;

    if (isToday(currentDate, date)) {
        return timeString;
    }

    if (isYesterday(currentDate, date)) {
        return `вчера в ${timeString}`;
    }

    let dateString = `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;

    if (!isCurrentYear(currentDate, date)) {
        dateString = `${dateString} ${date.getUTCFullYear()} года`;
    }

    return `${dateString} в ${timeString}`
}

function leftPad(value) {
    return value < 10
        ? `0${value}`
        : value.toString();
}

function isCurrentYear(currentDate, date) {
    return date.getUTCFullYear() === currentDate.getUTCFullYear();
}

function isToday(currentDate, date) {
    return date.getUTCDate() === currentDate.getUTCDate() &&
            date.getUTCMonth() === currentDate.getUTCMonth() &&
            date.getUTCFullYear() === currentDate.getUTCFullYear();
}

function isYesterday(currentDate, date) {
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getUTCDate() - 1);

    return date.getUTCDate() === yesterdayDate.getUTCDate() &&
            date.getUTCMonth() === yesterdayDate.getUTCMonth() &&
            date.getUTCFullYear() === yesterdayDate.getUTCFullYear();
}

module.exports = formatDate;
