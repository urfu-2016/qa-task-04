const monthDic = [' января ',' февраля ',' марта ',
    ' апреля ',' мая ',' июня ',' июля ',' августа ',
    ' сентября ',' октября ',' ноября ',' декабря ',];

function formatDate(date) {
    var dateNow = new Date();

    if (!(date instanceof Date)){
        throw new TypeError('Входной параметр должен быть типа Date');
    }

    date = new Date(date);

    if (date.toString() === 'Invalid Date') {
        throw new TypeError('Входной параметр должен содержать корректные данные');
    }


    if (dateNow < date) {
        throw new Error('date не должен превышать текущую дату');
    }

    var yearFromData = date.getFullYear();
    var monthFromData = date.getMonth();
    var dayFromData = date.getDate();

    var yesterday = new Date(dateNow.valueOf());
    yesterday.setDate(yesterday.getDate() - 1);
    var time = addZero(date.getHours())+':'+addZero(date.getMinutes());

    if (dateNow.toLocaleDateString() === date.toLocaleDateString())
        return time;
    else if (yesterday.toLocaleDateString() === date.toLocaleDateString())
            return 'вчера в ' + time;
    else if (yearFromData === dateNow.getFullYear())
            return dayFromData +  monthDic[monthFromData] + 'в ' + time;
    return dayFromData + monthDic[monthFromData] + yearFromData + ' года в ' + time;


}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

module.exports = formatDate;
