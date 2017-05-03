const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

describe('formatDate', () => {

    it('should return `HH:MM` for today', () => {
        const date = new Date(2017, 4, 3, 10, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), '10:10');
        currentDate.restore();
    });

    it('should return `12:00` for today at 12:0', () => {
        const date = new Date(2017, 4, 3, 12);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), '12:00');
        currentDate.restore();
    });

    it('should return `09:10` for today at 9:10', () => {
        const date = new Date(2017, 4, 3, 9, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), '09:10');
        currentDate.restore();
    });

    it('should return `вчера в HH:MM` for yesterday', () => {
        const date = new Date(2017, 4, 2, 10, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), 'вчера в 10:10');
        currentDate.restore();
    });

    it('should return `DD MM YYYY в HH:MM` for last year', () => {
        const date = new Date(2016, 4, 2, 10, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), '2 мая 2016 в 10:10');
        currentDate.restore();
    });

    it('should return `DD MM в HH:MM` for earlier dates this year', () => {
        const date = new Date(2017, 3, 2, 10, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        assert.equal(formatDate(date), '2 апреля в 10:10');
        currentDate.restore();
    });

    it('should throw error for future dates', () => {
        const date = new Date(2018, 3, 2, 10, 10);
        const currentDate = sinon.useFakeTimers(new Date(2017, 4, 3, 12, 12).getTime());
        const cb = () => formatDate(date);
        assert.throws(cb, /Дата не должна быть больше текущей/);
        currentDate.restore();
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
