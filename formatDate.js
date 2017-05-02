const months = [
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
    'декабря',
];

function formatDate(date) {
    if (arguments.length !== 1) {
        throw new Error('Need pass one argument');
    }

    if (!(typeof(date) === 'string')) {
        throw new Error('Wrong type argument')
    }

    let parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
        throw new Error('Invalid format string');
    }

    let inputDate = new Date(parsedDate);
    let now = new Date(Date.now());

    let minutes = inputDate.getMinutes() < 10 ? '0' + inputDate.getMinutes() : inputDate.getMinutes();
    let time = `${inputDate.getHours()}:${minutes}`;

    if (now.getFullYear() - inputDate.getFullYear() > 0) {
        return `${inputDate.getDate()} ${months[inputDate.getMonth()]} ${inputDate.getFullYear()} года в ${time}`
    }

    if (now.getMonth() - inputDate.getMonth() > 0 || now.getDay() - inputDate.getDay() > 1) {
        return `${inputDate.getDate()} ${months[inputDate.getMonth()]} в ${time}`
    }

    if (now.getDay() - inputDate.getDay() === 1) {
        return `вчера в ${time}`
    }

    return time;
}

module.exports = {
    formatDate: formatDate,
    months: months
};
