'use strict';

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

Date.prototype.addDays = function(days) {
  var newDate = new Date(this.valueOf());
  newDate.setDate(newDate.getDate() + days);
  
  return newDate;
}

/**
 * @param {Date} date
 * @return {String} formatted date
 */
function formatDate(date, todayDate = new Date()) {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const hoursAndMinutes = date.toLocaleTimeString('ru', {hour:'2-digit', minute:'2-digit'}); 
    
    return haveSameDates(date, todayDate)            ? hoursAndMinutes 
         : haveSameDates(date.addDays(1), todayDate) ? `вчера в ${hoursAndMinutes}`
         : year === todayDate.getFullYear()          ? `${day} ${month} в ${hoursAndMinutes}`
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

module.exports = {
    formatDate: formatDate,
    haveSameDates: haveSameDates
}
