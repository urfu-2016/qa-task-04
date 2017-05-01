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
    let tempDate = new Date(date);
    tempDate = new Date(tempDate.setDate(date.getDate()+1));
    let isThisYear = currentDate.getFullYear() === date.getFullYear();

    let isYesterday = currentDate.getFullYear() === tempDate.getFullYear() &&
        currentDate.getMonth() === tempDate.getMonth() &&
        currentDate.getDate()  === tempDate.getDate();

    let isToday = currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate();

    let months = ['января' ,'февраля', 'марта', 'апреля', 'мая' ,'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


    if (isToday)
        formattedDate = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
    else if (isYesterday)
        formattedDate = `вчера в ${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
    else if (isThisYear)
        formattedDate =  `${date.getDate()} ${months[date.getMonth()]}`+
            ` в ${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
    else
        formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${(date.getFullYear())} года` +
            ` в ${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
    return formattedDate;
}

module.exports = formatDate;
