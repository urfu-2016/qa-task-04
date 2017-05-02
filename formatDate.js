const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая',
                    'июня', 'июля', 'августа', 'сентября',
                    'октября', 'ноября', 'декабря'];

function formatDate(date) {
    const chooseDate = new Date(date);
    const todayDate = new Date();

    if (chooseDate.toString() === 'Invalid Date' ||
        todayDate.toString() === 'Invalid Date') {
        throw new TypeError('Date should not invalid');
    }
    const chooseTime = `${chooseDate.getHours()}:${chooseDate.getMinutes()}`;
    const chooseDay =  `${chooseDate.getDate()} ${MONTHS[chooseDate.getMonth()]}`;
    const chooseFullDate = `${chooseDay} ${chooseDate.getFullYear()} года в ${chooseTime}`;

    if (chooseDate > todayDate) {
        throw new RangeError('Choose date should be earlier today');
    }

    if (isToday(chooseDate, todayDate)) {
        return chooseTime;
    }

    if (isYesterday(chooseDate, todayDate)) {
        return `вчера в ${chooseTime}`;
    }

    if (isThisYear(chooseDate, todayDate)) {
        return `${chooseDay} в ${chooseTime}`;
    }

    return chooseFullDate;
}

function isToday(chooseDate, todayDate) {
    return chooseDate.toDateString() === todayDate.toDateString();
}

function isYesterday(chooseDate, todayDate) {
    todayDate.setDate(todayDate.getDate() - 1);
    return isToday(chooseDate, todayDate);
}

function isThisYear(chooseDate, todayDate) {
    return chooseDate.getFullYear() == todayDate.getFullYear();
}


module.exports = formatDate;