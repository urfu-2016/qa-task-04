function formatDate(date) {
    const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    const DATE_NOW = new Date();

    function addZeroToTime(time) {
        return time > 9 ? time : '0' + time;
    }

    function makeTime(date) {
        return `${addZeroToTime(date.getHours())}:${addZeroToTime(date.getMinutes())}`;
    }

    function makeDate(date) {
        return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
    }

    function isYesterday(date) {
        date.setDate(date.getDate() + 1);

        return date.toDateString() === DATE_NOW.toDateString();
    }

    if (!(date instanceof Date)) {
        throw new Error('argument should be a date');
    } else if (date > DATE_NOW) {
        throw new Error('argument should be a date from past');
    } else if (arguments.length !== 1) {
        throw new Error('there should be only one argument');
    }

    if (date.toDateString() === DATE_NOW.toDateString()) {
        return makeTime(date);
    } else if (isYesterday(date)) {
        return `вчера в ${makeTime(date)}`;
    } else if (date.getFullYear() !== DATE_NOW.getFullYear()) {
        return `${makeDate(date)} ${date.getFullYear()} года в ${makeTime(date)}`;
    } else {
        return `${makeDate(date)} в ${makeTime(date)}`;
    }
}

module.exports = formatDate;
