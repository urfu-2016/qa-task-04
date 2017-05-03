const assert = require('assert');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    it('Должен вернуть 3 мая 2014 года 15:12 для Date(2014, 4, 3, 15, 12 ) ', () => {
        const actual = formatDate(new Date(2014, 4, 3, 15, 12 ));
        assert.equal(actual, '3 мая 2014 года 15:12');
    });
	
	it('Должен вернуть 3 мая 15:12 для Date(2017, 2, 3, 15, 12 ) ', () => {
        const actual = formatDate(new Date(2017, 2, 3, 15, 12 ));
        assert.equal(actual, '3 марта 15:12');
    });
	
	it('Должен вернуть вчера в 15:12 для Date(2017, 4, 2, 15, 12 ) ', () => {
        const actual = formatDate(new Date(2017, 4, 2, 15, 12 ));
        assert.equal(actual, 'вчера в 15:12');
    });
	
	it('Должен вернуть 15:12 для Date(2017, 4, 3, 15, 12 ) ', () => {
        const actual = formatDate(new Date(2017, 4, 3, 15, 12 ));
        assert.equal(actual, '15:12');
    });
	
	
it('Доджен выдать ошибку если введена не коррекная дата', () => {
    try {
        formatDate("4 мая");
        throw new Error('`formatDate` should throw error')
    } catch (error) {
        assert.equal(error.message, 'Введена не корректная дата');
    }
});	

it('Доджен выдать ошибку если введена не коррекная дата', () => {
    try {
        formatDate('date');
        throw new Error('`formatDate` should throw error')
    } catch (error) {
        assert.equal(error.message, 'Введена не корректная дата');
    }
});

it('should throw error when count more than one argument or not given an argument', () => {
    try {
        formatDate('34', 6);
        throw new Error('`formatDate` should throw error')
    } catch (error) {
        assert.equal(error.message, 'Введено более одного аргумета или функции не передан аргумент');
    }
});	

it('Должен вернуть сообщение о том, что введено более 1 аргумета или не введено аргументов', () => {
    try {
        formatDate();
        throw new Error('`formatDate` should throw error')
    } catch (error) {
        assert.equal(error.message, 'Введено более одного аргумета или функции не передан аргумент');
    }
});	










    // Напишите тесты на ваш замечательный код здесь
});
