const monthDic = [' января ',' февраля ',' марта ',
    ' апреля ',' мая ',' июня ',' июля ',' августа ',
    ' сентября ',' октября ',' ноября ',' декабря ',];

function formatDate(date) {
    var dateNow = new Date();

    if (!(date instanceof Date)){
        throw new TypeError('Входной параметр должны быть типа Date');
    }

    date = new Date(date);

    if (date.toString() === 'Invalid Date') {
        throw new TypeError('Входной параметр должны содержать корректные данные');
    }


    if (dateNow < date) {
        throw new Error('date не должен превышать текущую дату');
    }

    var year = dateNow.getFullYear();
    var month = dateNow.getMonth();
    var day = dateNow.getDate();

    var yearFromData = date.getFullYear();
    var monthFromData = date.getMonth();
    var dayFromData = date.getDate();

    var time = addZero(date.getHours())+':'+addZero(date.getMinutes());

    if (yearFromData === year && monthFromData === month && dayFromData === day)
        return time;
    else if (yearFromData === year && monthFromData === month &&  dayFromData === day-1)
            return 'вчера в ' + time;
    else if (yearFromData === year)
            return dayFromData +  monthDic[monthFromData] + 'в ' + time;
    else  return dayFromData + monthDic[monthFromData] + yearFromData + ' года в ' + time;

}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

module.exports = formatDate;
