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

function formatDate(date) {

    const parsedDate = Date.parse(date);
    if (!parsedDate) {
        throw new Error('Неправильный формат даты');
    }

    if (Date.now() - parsedDate < 0) {
        throw new Error('Дата не может быть больше системной');
    }

    return getFormattedDate(new Date(parsedDate));
}

function getFormattedDate(date) {

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    const elapsedTime = dateNow - date;
    if (elapsedTime <= 0) {
        return getFormattedTime(date);
    }
    const days = elapsedTime / 1000 / 60 / 60 / 24;
    if (days < 1) {
        return `вчера в ${getFormattedTime(date)}`;
    }
    const years = dateNow.getFullYear() - date.getFullYear();
    if (years < 1) {
        return `${getFormattedDay(date)} в ${getFormattedTime(date)}`;
    }
    return `${getFormattedDay(date)} ${getFormattedYear(date)} в ${getFormattedTime(date)}`;
}

function getFormattedTime(date) {
    return `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`;
}

function getFormattedDay(date) {
    return `${`0${date.getDate()}`.slice(-2)} ${MONTHS[date.getMonth()]}`;
}

function getFormattedYear(date) {
    return `${date.getFullYear()} года`;
}

module.exports = formatDate;
