const assert = require('assert');
const formatDate = require('../formatDate');

it('should throw error `Некорректное число аргументов функции`', () => {
    try {
        formatDate('42', 'Сорок два');
        throw new Error('`formatDate` should throw error')
    } catch (error) {
        assert.equal(error.message, 'Некорректное число аргументов функции');
    }
});	
