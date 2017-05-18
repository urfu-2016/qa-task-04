const assert = require('assert');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    it('should return `00:00` for `2017-05-18T00:00:00.000Z`', () => {                  // валится каждый день
        const actual = formatDate("2017-05-18T00:00:00.000Z");

        assert.equal(actual, "00:00");
    });


    it('should return `вчера в 23:59` for `2017-05-17T23:59:59.999Z`', () => {          // валится каждый день
        const actual = formatDate("2017-05-17T23:59:59.999Z");

        assert.equal(actual, "вчера в 23:59");
    });


    it('should return `30 апреля в 02:31` for `2017-04-30T02:31:59.999Z`', () => {
        const actual = formatDate("2017-04-30T02:31:59.999Z");

        assert.equal(actual, "30 апреля в 02:31");
    });

	it('should return `31 января 2000 года в 11:59` for `2000-01-31T11:59:59.000Z`', () => {
        const actual = formatDate("2000-01-31T11:59:59.999Z");

        assert.equal(actual, "31 января 2000 года в 11:59");
    });




    it('should throw an error when arguments in are more than 1', () => {
        const actual = () => formatDate("1999-12-31T10:59:59.999Z", "2007-08-15T10:22:59.999Z");

        assert.throws(actual, /На вход подаётся только 1 аргумент./);
    });    

    it ('should throw error when arguments number is 0', () =>{
    	const actual = () => formatDate();

    	assert.throws(actual, /На вход подаётся только 1 аргумент./);
    });
    it ('should throw error when arguments number is not data', () =>{
    	const actual = () => formatDate("эээээ");

    	assert.throws(actual, /На вход должна подаваться валидная дата./);
    });


});
