const RUSSIAN_MONTH = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

function padZero(number) {
    return ("0" + number).slice(-2)
}

function getFormattedTime(date) {
    return padZero(date.getHours()) + ":" + padZero(date.getMinutes());
}

function getYesterdayFormat(date) {
    let time = getFormattedTime(date);
    return `вчера в ${time}`;
}


function getYearFormat(date) {
    let time = getFormattedTime(date);
    let month = RUSSIAN_MONTH[date.getMonth()];

    return `${date.getDate()} ${month} ${date.getFullYear()} года в ${time}`;
}

function getMonthFormat(date) {
    let time = getFormattedTime(date);
    let month = RUSSIAN_MONTH[date.getMonth()];

    return `${date.getDate()} ${month} в ${time}`;
}


function formatDate(date) {
    if (arguments.length !== 1) {
        throw new Error("Функция принимает ровно 1 параметр")
    }

    let argDate = new Date(date);
    if (argDate.toDateString() === "Invalid Date") {
        throw new Error("В качестве аргумента передан неверный формат даты")
    }

    let curDate = new Date();
    if (curDate < argDate) {
        throw new Error("Время не может быть больше текущего")
    }
    if (curDate.toDateString() === argDate.toDateString()) {
        return getFormattedTime(argDate)
    }
    if (curDate.getFullYear() > argDate.getFullYear()) {
        return getYearFormat(argDate);
    }

    let yesterdayDate = new Date();
    yesterdayDate.setDate(curDate.getDate() - 1);
    if (yesterdayDate.toDateString() === argDate.toDateString()) {
        return getYesterdayFormat(argDate);
    }

    return getMonthFormat(argDate)
}

module.exports = formatDate;
