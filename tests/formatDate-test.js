const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

describe('formatDate', () => {
    var currentDate;

    beforeEach(function () {
        const startDate = new Date(2017, 4, 3, 10, 10).getTime();
        currentDate = sinon.useFakeTimers(startDate);
    });
    afterEach(() => currentDate.restore());

    it('should return `HH:MM` for today', () => {
        var date = new Date(2017, 4, 3, 10, 10);
        assert.equal(formatDate(date), '10:10');
    });

    it('should return `10:00` for today at 10:0', () => {
        var date = new Date(2017, 4, 3, 10);
        assert.equal(formatDate(date), '10:00');
    });

    it('should return `09:10` for today at 9:10', () => {
        var date = new Date(2017, 4, 3, 9, 10);
        assert.equal(formatDate(date), '09:10');
    });

    it('should return `вчера в HH:MM` for yesterday', () => {
        var date = new Date(2017, 4, 2, 10, 10);
        assert.equal(formatDate(date), 'вчера в 10:10');
    });

    it('should return `DD MM YYYY в HH:MM` for last year', () => {
        var date = new Date(2016, 4, 2, 10, 10);
        assert.equal(formatDate(date), '2 мая 2016 в 10:10');
    });

    it('should return `DD MM в HH:MM` for earlier dates this year', () => {
        var date = new Date(2017, 3, 2, 10, 10);
        assert.equal(formatDate(date), '2 апреля в 10:10');
    });

    it('should throw error for future dates', () => {
        var date = new Date(2018, 3, 2, 10, 10);
        const cb = () => formatDate(date);
        assert.throws(cb, /Дата не должна быть больше текущей/);
    });

    it('should throw error for incorrect dates', () => {
        const cb = () => formatDate([]);
        assert.throws(cb, /В качестве параметра должна передаваться корректная дата/);
    });

    it('should throw error for >1 arguments', () => {
        const cb = () => formatDate([], []);
        assert.throws(cb, /На вход должен подаваться только один параметр/);
    });
});
