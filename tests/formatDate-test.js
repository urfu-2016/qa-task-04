'use strict';

const sinon = require('sinon');
const assert = require('assert');
const formatDate = require('../formatDate');


describe('formatDate', () => {
    let clock;

    before(function () {
        const startDate = new Date('January 10, 2017 21:30').getTime();
        clock = sinon.useFakeTimers(startDate);
    });

    after(() => clock.restore());

    it('should print only time if day is today', () => {
        const today = new Date('January 10, 2017 21:30');

        const actualResult = formatDate(today);

        assert.equal(actualResult, '21:30');
    });

    it('should print `вчера в ЧЧ:MM` when day is yesterday', () => {
        const yesterday = new Date('January 9, 2017 21:30');

        const actualResult = formatDate(yesterday);

        assert.equal(actualResult, 'вчера в 21:30');
    });

    it('should pring `ДД МЕСЯЦ в ЧЧ:ММ` when date is > 1 days earlier', () => {
        const nextDay = new Date('January 1, 2017 12:00');

        const actualResult = formatDate(nextDay);

        assert.equal(actualResult, '1 января в 12:00');
    }); 

    it('should pring `ДД МЕСЯЦ ГГГГ года в ЧЧ:ММ` when date is more than 1 year earlier', () => {
        const dayBeforeYesterday = new Date('January 1, 2016 12:00');

        const actualResult = formatDate(dayBeforeYesterday);

        assert.equal(actualResult, '1 января 2016 года в 12:00');
    });

    it('should throws `TypeError` when argument is Invalid Date', () => {
        const date = new Date('Incorrect date');

        const formatAction = () => formatDate(date);

        assert.throws(formatAction, TypeError, 'Argument must be of type Date')
    });

    it('should throws `TypeError` when argument not of Date type', () => {
        const notDate = 'Not date';

        const formatAction = () => formatDate(notDate);

        assert.throws(formatAction, TypeError, 'Argument must be of type Date')
    })
});