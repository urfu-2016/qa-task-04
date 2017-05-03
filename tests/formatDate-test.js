'use strict';

const assert = require('assert');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    it('should print only time if day is today', () => {
        const todayMorning = new Date('January 1, 2017 07:00:00');
        const todayEvening = new Date('January 1, 2017 19:00:00');

        const actualResult = formatDate.formatDate(todayMorning, todayEvening);

        assert.equal(actualResult, '07:00');
    });

    it('should print `вчера в ЧЧ:MM` when day is yesterday', () => {
        const yesterdayMorning = new Date('January 1, 2017 07:00:00');
        const todayEvening = new Date('January 2, 2017 19:00:00');

        const actualResult = formatDate.formatDate(yesterdayMorning, todayEvening);

        assert.equal(actualResult, 'вчера в 07:00');
    });

    it('should pring `ДД МЕСЯЦ в ЧЧ:ММ` when date is > 1 days earlier', () => {
        const today = new Date('January 10, 2017 12:00:00');
        const dayBeforeYesterday = new Date('January 8, 2017 12:00:00');

        const actualResult = formatDate.formatDate(dayBeforeYesterday, today);

        assert.equal(actualResult, '8 января в 12:00');
    }); 

    it('should pring `ДД МЕСЯЦ ГГГГ года в ЧЧ:ММ` when date is more than 1 year earlier', () => {
        const today = new Date('January 1, 2017 12:00:00');
        const dayBeforeYesterday = new Date('January 1, 2016 12:00:00');

        const actualResult = formatDate.formatDate(dayBeforeYesterday, today);

        assert.equal(actualResult, '1 января 2016 года в 12:00');
    });

    it('should throws `TypeError` when argument not of Date type', () => {
        const date = new Date('Incorrect date');

        const formatAction = () => formatDate.formatDate(date);

        assert.throws(formatAction, TypeError, 'Argument must be of type Date')
    })
});

describe('haveSameDates', () => {
    it('should return true if dates have equal DD:MM:YYYY', () => {
        var todayMorning = new Date('January 1, 2017 07:00:00');
        var todayEvening = new Date('January 1, 2017 19:00:00');

        var actualResult = formatDate.haveSameDates(todayMorning, todayEvening);
    
        assert.equal(actualResult, true);
    });

    it('should return false if dates has not equal DD:MM:YYYY', () => {
        const todayMorning = new Date('January 1, 2017');
        const tommorowEvening = new Date('January 2, 2017');

        const actualResult = formatDate.haveSameDates(todayMorning, tommorowEvening);
    
        assert.equal(actualResult, false);
    });
})
