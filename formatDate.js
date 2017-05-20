const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'];

function formatDate(date) {

    var currentDate = new Date();
    var yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    date = new Date(date);

    if (arguments.length !== 1)
        throw new Error('На вход должен подаваться только один параметр');
    if (date.toString() === 'Invalid Date')
        throw new Error('В качестве параметра должна передаваться корректная дата');
    if (date > currentDate)
        throw new Error('Дата не должна быть больше текущей');

    var formattedTime = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
    var formattedDate = date.getDate() + ' ' + MONTHS[date.getMonth()];

    if (currentDate.getFullYear() !== date.getFullYear())
        return `${formattedDate} ${date.getFullYear()} в ${formattedTime}`;
    if (areDatesEqual(date, currentDate))
        return formattedTime;
    if (areDatesEqual(date, yesterday))
        return 'вчера в ' + formattedTime;
    return formattedDate + ' в ' + formattedTime;
}

function areDatesEqual(date, currentDate) {
    return (date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate())
}

function addZero(time) {
    time < 10 ? time = '0' + time : time;
    return time;
}

module.exports = formatDate;