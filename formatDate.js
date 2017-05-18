const moths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

function formatDate(dateIn) {
    if (arguments.length !== 1){
    	throw new Error('На вход подаётся только 1 аргумент.');
	}

    date = new Date(dateIn);
    if (isNaN(date.getTime())) {
    	throw new Error('На вход должна подаваться валидная дата.');
	}

	var twMinutes = timeToStr(date.getUTCMinutes());
	var twHours = timeToStr(date.getUTCHours());
	var twDate = date.getUTCDate();
	var twMonth = date.getUTCMonth();
	var twYear = date.getFullYear();

    var today = new Date();
    var curDd = today.getUTCDate();
    var curYear = today.getFullYear();

    if (twDate === curDd){
		return twHours + ':' + twMinutes;
	}
    if (twDate === curDd-1){
    	return 'вчера в '+ twHours + ':' + twMinutes;
    }
    if (twYear < curYear)
    	return twDate + ' ' + moths[twMonth] + ' ' + twYear + ' года в ' + twHours + ':'+ twMinutes;
	return twDate + ' ' + moths[twMonth] + ' в ' + twHours + ':'+ twMinutes;

}

function timeToStr(time){
	if (time < 10)
		return('0' + time);
	return time;
}

module.exports = formatDate;
