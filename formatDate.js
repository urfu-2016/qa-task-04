module.exports = formatDate;

function formatDate(date) {
    var now = new Date();
    var date = new Date(date);
    var dateTime = date.toLocaleTimeString('ru-RU',
        { hour: '2-digit', minute: '2-digit'})
    var dateDay = date.getDate().toString()
    var nowDay = now.getDate().toString()
    var dateMonth = date.getMonth()
    var nowMonth = now.getMonth()
    var dateYear = date.getFullYear().toString()
    var nowYear = now.getFullYear().toString()
    var month = ['января', 'февраля', 'марта', "апреля", "мая", "июня", "июля",
                "августа", "сентября", 'октября', 'ноября', "декабря"]

	if (date.toString() == 'Invalid Date'){
		throw new Error('Неверный формат даты')
	};

    if (nowDay == dateDay && nowMonth == dateMonth && nowYear == dateYear){
        return (dateTime)
    }
    else {
        now.setDate(nowDay - 1)
        var yesterday = now.getDate()
        var yesterdayMonth = now.getMonth()
        var yesterdayYear = now.getFullYear()
        if (now.getDate() == dateDay && yesterdayMonth == dateMonth
            && yesterdayYear == dateYear){
            return ("Вчера в " + dateTime)
        }
        else {
            if (nowYear == dateYear){
                return (dateDay + " " +  month[dateMonth] + " в "+ dateTime)
            }
            else{
                return (dateDay + " " +  month[dateMonth] + ' '+ dateYear +
                 " года в " + dateTime)
            };
        };
    };
}
