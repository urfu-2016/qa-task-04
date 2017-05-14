function getFormattedTime(date){
    return `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;
}

function formatDate(date) {
    // Напишите код форматирования даты в этом месте
    date = new Date(date);
    if (date.toString() === 'Invalid Date') {
        throw new Error('Неверный формат даты');
    }
    let formattedDate = '';
    let currentDate = new Date();
    if (currentDate < date)
        throw new Error('Дата твита больше текущей');
    let yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate()-1);
    let isThisYear = currentDate.getFullYear() === date.getFullYear();

    let isYesterday = yesterdayDate.getFullYear() === date.getFullYear() &&
        yesterdayDate.getMonth() === date.getMonth() &&
        yesterdayDate.getDate()  === date.getDate();

    let isToday = currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate();

    let months = ['января' ,'февраля', 'марта', 'апреля', 'мая' ,'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


    if (isToday)
        formattedDate = getFormattedTime(date);
    else if (isYesterday)
        formattedDate = `вчера в ${getFormattedTime(date)}`;
    else if (isThisYear)
        formattedDate =  `${date.getDate()} ${months[date.getMonth()]}`+
            ` в ${getFormattedTime(date)}`;
    else
        formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${(date.getFullYear())} года` +
            ` в ${getFormattedTime(date)}`;
    return formattedDate;
}

module.exports = formatDate;
