const MONTHLIST = ['января', 'февраля', 'марта', 'апреля', 'мая','июня', 'июля',
                'августа', 'сентября','октября', 'ноября', 'декабря']

function formatDate(date) {
	if(!(arguments.length == 1))
		throw new Error('Некорректное число аргументов функции');
}

module.exports = formatDate;
