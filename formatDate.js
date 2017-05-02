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
	'декабря'
];

function formatDate(date) {
    date = new Date(date);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	
	if (sameDate(date, today)) {
		return getTime(date);
	}
	
	if (sameDate(date, yesterday)) {
		return `вчера в ${getTime(date)}`;
	}
	
	if (date.getFullYear() !== today.getFullYear()) {
		return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} года в ${getTime(date)}`;
	}
	
	return `${date.getDate()} ${months[date.getMonth()]} в ${getTime(date)}`;
}

function sameDate(date1, date2) {
	return date1.getDate() === date2.getDate() && 
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear(); 
}

function getTime(date) {
	return `${prependZero(date.getHours())}:${prependZero(date.getMinutes())}`;
}

function prependZero(number) {
	return (number < 10 ? '0' : '') + number
}
module.exports = formatDate;
