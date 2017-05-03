function formatDate(date) {
    
	if( arguments.length!==1){
		throw new Error('Введено более одного аргумета или функции не передан аргумент');
	}
		
	if ('Invalid Date' ==  new Date(date)) {
        throw new Error('Введена не корректная дата');
	}

	var Data1 = new Date();
	

	
	var Year = Data1.getFullYear();
    var Month = Data1.getMonth();
    var Day = Data1.getDate();
	var Year1 = date.getFullYear();
    var Month1 = date.getMonth();
    var Day1 = date.getDate();
	
	
	switch (Month1)
    {
        case 0: Month2="января"; break;
        case 1: Month2="февраля"; break;
        case 2: Month2="марта"; break;
        case 3: Month2="апреля"; break;
        case 4: Month2="мая"; break;
        case 5: Month2="июня"; break;
        case 6: Month2="июля"; break;
        case 7: Month2="августа"; break;
        case 8: Month2="сентября"; break;
        case 9: Month2="октября"; break;
        case 10: Month2="ноября"; break;
        case 11: Month2="декабря"; break;
    }
	
	
	if (Year!=Year1)
	    return Day1+" "+Month2+" "+Year1+" года "+date.getHours()+":"+ date.getMinutes();
	else
	    {
		if (Month!==Month1)
		    return Day1+" "+Month2+" "+date.getHours()+":"+ date.getMinutes();
	    else
		    switch(Day1){
				case Day: return date.getHours()+":"+ date.getMinutes(); 
				case Day-1: return "вчера в "+date.getHours()+":"+ date.getMinutes();
				default: return Day1+" "+Month2+" "+date.getHours()+":"+ date.getMinutes();
			}
		}
			
			
    	
	
}

module.exports = formatDate;
