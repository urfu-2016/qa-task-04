const MONTHS = [
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
    // Напишите код форматирования даты в этом месте
    date = new Date(date);
	
    if (date.toString() === 'Invalid Date') 
        throw new Error('Неверный формат даты');
    	
	const today = new Date();
	
	if (today < date)
        throw new Error('Подозрительно, дата в будущем времени');
	
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	
	if (equalsData(date, today)) {
		return getTime(date);
	}
	
	if (equalsData(date, yesterday)) {
		return `вчера в ${getTime(date)}`;
	}
	
	if (date.getFullYear() === today.getFullYear()) {
		return `${date.getDate()} ${MONTHS[date.getMonth()]} в ${getTime(date)}`;
	}
	return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} года в ${getTime(date)}`;

}

function equalsData(date1, date2) {
	return date1.getDate() === date2.getDate() && 
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear(); 
}

function getTime(date) {
	return `${('0'+date.getHours()).slice(-2)}:${('0'+date.getMinutes()).slice(-2)}`;
}

module.exports = formatDate;