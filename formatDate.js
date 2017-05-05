'use strict';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

/**
 * Returns new Date object with increased number of days
 * @param {Number} days number of days to increase
 * @return {Date} new Date object
 */
Date.prototype.addDays = function(days) {
  var newDate = new Date(this.valueOf());
  newDate.setDate(newDate.getDate() + days);
  
  return newDate;
}

/**
 * @param {Date} date
 * @return {String} formatted date
 */
function formatDate(date) {
    if (!(date instanceof Date) || date.toString() === 'Invalid Date')
        throw new TypeError('Argument must be of type Date');
    
    const today = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const hoursAndMinutes = `${hours}:${minutes}`;
    
    return haveSameDates(date, today)            ? hoursAndMinutes 
         : haveSameDates(date.addDays(1), today) ? `вчера в ${hoursAndMinutes}`
         : year === today.getFullYear()          ? `${day} ${month} в ${hoursAndMinutes}`
         : `${day} ${month} ${year} года в ${hoursAndMinutes}`;
}

/**
 * Checks if two dates have same DD:MM:YYYY format
 * @param {Date} date
 * @param {Date} anotherDate
 * @return {Bool} result of format comparison
 */
function haveSameDates(date, anotherDate) {
    return date.toLocaleDateString() === anotherDate.toLocaleDateString();
}

module.exports = formatDate;
