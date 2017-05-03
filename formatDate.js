'use strict';

const MONTH = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентебря',
    'октября',
    'ноября',
    'декабря'
]

function formatDate(date) {
    if (arguments.length !== 1) {
        throw new Error('Length of arguments is not 1');
    }
    
    var parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid Date');
    }
    const currentDate = new Date();
    if (parsedDate > currentDate) {
        throw new Error('Date is greater then the current date');
    }
    
    var result;
    const year = parsedDate.getUTCFullYear();
    const day = parsedDate.getUTCDate();
    const hours = parsedDate.getUTCHours();
    const minutes = parsedDate.getUTCMinutes()
    const month = parsedDate.getUTCMonth();
    const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString(); 
    
    if (currentDate.getUTCFullYear() !==  year) {
        result = `${day} ${MONTH[month]} ${year} года в ${hours}:${minutesString}`
    } else {
        var currentMonth = currentDate.getUTCMonth();
        
        const diff = (currentMonth === month) ? currentDate.getUTCDate() - day : Infinity;
        switch(diff) {
            case 0: 
                result = `${hours}:${minutesString}`;
                break;
            case 1: 
                result = `вчера в ${hours}:${minutesString}`;
                break;
            default:
                result = `${day} ${MONTH[month]} в ${hours}:${minutesString}`;
        }
    }
    
    return result;
}

module.exports = formatDate;
