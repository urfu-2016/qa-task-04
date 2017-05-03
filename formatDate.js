const moths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

function formatDate(date1) {
    if (arguments.length !== 1){
    	throw new Error('На вход подаётся только 1 аргумент.');
	}

    date = new Date(date1);
    if (isNaN(date.getTime())) {
    	throw new Error('На вход должна подаваться валидная дата.');
	}


    var today = new Date();
    var curDd = today.getUTCDate();
    var curYear = today.getFullYear();

    if (date.getUTCHours() < 10)
    		var hours = '0'+ (date.getUTCHours());
    	else
    		var hours = date.getUTCHours();
    	if (date.getUTCMinutes() < 10)
    		var minutes = '0' + date.getUTCMinutes();
    	else 
    		var minutes = date.getUTCMinutes();

    if (date.getUTCDate() === curDd){
		return hours + ':' + minutes;
	}
    if (date.getUTCDate() === curDd-1){
    	return 'вчера в '+ hours + ':' + minutes;
    }
    if (date.getFullYear() < curYear)
    	return date.getUTCDate() + ' ' + moths[date.getUTCMonth()] + ' ' + date.getFullYear() + ' года в ' + hours + ':'+ minutes;
	return date.getUTCDate() + ' ' + moths[date.getUTCMonth()] + ' в ' + hours + ':'+ minutes;

}

module.exports = formatDate;
