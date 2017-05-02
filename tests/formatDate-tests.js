const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../formatDate');

function getFakeClock(year, month, day) {
    return sinon.useFakeTimers(new Date(year, month, day).getTime());
}

describe('formatDate', () => {
    it('should throw error when date format is incorrect', () => {
        const cb = () => formatDate('Incorrect date format');

        assert.throws(cb, /Некорректный формат даты/);
    });

    it('should throw error when number of arguments is more than one', () => {
        const cb = () => formatDate(new Date(), new Date());

        assert.throws(cb, /Количество аргументов должно быть равным 1/);
    });

    it('should throw error when no arguments given', () => {
        const cb = () => formatDate();

        assert.throws(cb, /Количество аргументов должно быть равным 1/);
    });

    it('should throw error when date relates to the future', () => {
        const clock = getFakeClock(2017, 5, 1);
        const cb = () => formatDate(new Date(2017, 5, 2));

        assert.throws(cb, /Дата не может быть в будущем времени/);
        clock.restore();
    });

    it('should return only hh:mm when date is today', () => {
        const currentDate = new Date();
        currentDate.setHours(12);
        currentDate.setMinutes(12);

        assert.equal(formatDate(currentDate), '12:12');
    });

    it('should return correct hh:mm when hours and minutes less than zero', () => {
        const currentDate = new Date();
        currentDate.setHours(9);
        currentDate.setMinutes(1);

        assert.equal(formatDate(currentDate), '09:01');
    });

    it('should return `вчера в hh:mm` when date is yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(12);
        yesterday.setMinutes(12);

        assert.equal(formatDate(yesterday), 'вчера в 12:12');
    });

    it('should return `dd month в hh:mm` when date relates to this year', () => {
        const clock = getFakeClock(2017, 5, 3);
        const date = new Date(2017, 5, 1);
        date.setHours(12);
        date.setMinutes(12);

        assert.equal(formatDate(date), '1 июня в 12:12');
        clock.restore();
    });

    it('should return `dd month year года в hh:mm` when date is year ago', () => {
        const clock = getFakeClock(2017, 5, 3);
        const yearAgoDate = new Date(2016, 5, 3);
        yearAgoDate.setHours(9);
        yearAgoDate.setMinutes(30);

        assert.equal(formatDate(yearAgoDate), '3 июня 2016 года в 09:30');
        clock.restore();
    });
});