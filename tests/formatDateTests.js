const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../formatDate');

describe('formatDate', ()=>{
	it('should return error when date is invalid', () => {
		var date = () => {
			try{
				formatDate('23 марта');
			}
			catch(err){
				throw err;
			}}

		assert.throws(date, /Неверный формат даты/);
	});

	it('should return time when is today', () =>{
		var now = sinon.useFakeTimers(new Date(2017, 5, 3, 23, 3).getTime());
		var date = new Date(2017, 5, 3, 13, 21);

		assert.equal(formatDate(date.toString()), '13:21');
		now.restore();
	});

	it('should return "Вчера в " and time when is yesterday', () =>{
		var now = sinon.useFakeTimers(new Date(2017, 5, 3).getTime());
		var date = new Date(2017, 5, 2, 13, 21);

		assert.equal(formatDate(date), 'Вчера в 13:21');
		now.restore();
	});

	it('should return day, month and time when is this year', () =>{
		var now = sinon.useFakeTimers(new Date(2017, 5, 3).getTime());
		var date = new Date(2017, 4, 12, 13, 21);

		assert.equal(formatDate(date), '12 мая в 13:21');
		now.restore();
	});

	it('should return day, month, year and time when is other year', () =>{
		var now = sinon.useFakeTimers(new Date(2017, 5, 3).getTime());
		var date = new Date(2015, 8, 12, 13, 21);

		assert.equal(formatDate(date), '12 сентября 2015 года в 13:21');
		now.restore();
	});
});
