const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая',
                    'июня', 'июля', 'августа', 'сентября',
                    'октября', 'ноября', 'декабря'];

function formatDate(date) {
    const pastDate = new Date(date);
    const todayDate = new Date();

    if (pastDate.toString() === 'Invalid Date') {
        throw new TypeError('Date should not invalid');
    }
    const chooseTime = `${padZero(pastDate.getHours())}:${padZero(pastDate.getMinutes())}`;
    const chooseDay =  `${pastDate.getDate()} ${MONTHS[pastDate.getMonth()]}`;
    const chooseFullDate = `${chooseDay} ${pastDate.getFullYear()} года в ${chooseTime}`;

    if (pastDate > todayDate) {
        throw new RangeError('Choose date should be earlier today');
    }

    if (isToday(pastDate, todayDate)) {
        return chooseTime;
    }

    if (isYesterday(pastDate, todayDate)) {
        return `вчера в ${chooseTime}`;
    }

    if (isThisYear(pastDate, todayDate)) {
        return `${chooseDay} в ${chooseTime}`;
    }

    return chooseFullDate;
}

function padZero(timeElement) {
    return timeElement < 10 ? '0' + timeElement : timeElement;
}

function isToday(pastDate, todayDate) {
    return pastDate.toDateString() === todayDate.toDateString();
}

function isYesterday(pastDate, todayDate) {
    todayDate.setDate(todayDate.getDate() - 1);
    return isToday(pastDate, todayDate);
}

function isThisYear(pastDate, todayDate) {
    return pastDate.getFullYear() == todayDate.getFullYear();
}


module.exports = formatDate;