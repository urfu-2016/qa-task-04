const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

describe('formatDate', () => {
    it('should return only time if today', () => {
        const date = new Date(2017, 5, 3, 1, 11);
        const todayDate = sinon.useFakeTimers(new Date(2017, 5, 3, 1, 11).getTime());

        assert.equal(formatDate(date), '1:11');
        todayDate.restore();
    });

    it('should return `вчера` date - if date is yesterday', () => {
        const date = new Date(2017, 5, 2, 1, 11);
        const todayDate = sinon.useFakeTimers(new Date(2017, 5, 3, 1, 11).getTime());

        assert.equal(formatDate(date), 'вчера в 1:11');
        todayDate.restore();
    });

    it('should return "dd month в hh:mm" for more day ago date', () => {
        const date = new Date(2017, 4, 3, 14, 11);
        const todayDate = sinon.useFakeTimers(new Date(2017, 5, 3, 1, 11).getTime());

        assert.equal(formatDate(date), '3 апреля в 14:11');
        todayDate.restore();
    });

    it('should return "dd month yy года в hh:mm" for more year ago date', () => {
        const date = new Date(2016, 5, 3, 14, 11);
        const todayDate = sinon.useFakeTimers(new Date(2017, 5, 3, 1, 11).getTime());

        assert.equal(formatDate(date), '3 мая 2016 года в 14:11');
        todayDate.restore();
    });

	it('should throw error number of arguments != 1', () => {
        const error = () => formatDate('', new Date());

        assert.throws(error, /Неверное число аргументов/);
    });
	
    it('should throw error when date format is incorrect', () => {
        const date = 'Invalid Date';
        const error = () => formatDate(date);

        assert.throws(error, /Переданный аргумент не формата Date/);
    });


    it('should throw error when date relates to the future', () => {
        const date = new Date(2018, 5, 3, 1, 11);
        const todayDate = sinon.useFakeTimers(new Date(2017, 5, 3, 1, 11).getTime());
        const error = () => formatDate(date);

        assert.throws(error, /Дата должна быть до текущей даты/);
        todayDate.restore();
    });
});