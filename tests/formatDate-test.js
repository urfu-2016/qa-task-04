'use strict';

const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

describe('formatDate', () => {
    it('should return TypeError for not Date argument', () => {
        let cb = () => formatDate('not Date');

        assert.throws(cb, /date should be Date/);
        assert.throws(cb, TypeError);
    });

    it('should return Error for not valid date', () => {
        let notValidDate = new Date('hello, world!');
        let cb = () => formatDate(notValidDate);

        assert.throws(cb, /date should be correct/);
    });

    it('should return Error for date, which greater than current time', () => {
        let date = new Date();
        date.setYear(date.getFullYear() + 1);
        let cb = () => formatDate(date);

        assert.throws(cb, /date should not be greater than current date/);
    });

    it('should return only time if date is today', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        let todayDate = sinon.useFakeTimers(new Date(2017, 1, 1, 15, 0));

        assert.equal(formatDate(date), '10:00');
        todayDate.restore();
    });

    it('should return only time if date is today', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        let todayDate = sinon.useFakeTimers(new Date(2017, 1, 1, 15, 0));

        assert.equal(formatDate(date), '10:00');
        todayDate.restore();
    });

    it('should return `вчера в ` and time if date is yesterday', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        let todayDate = sinon.useFakeTimers(new Date(2017, 1, 2, 15, 0));

        assert.equal(formatDate(date), 'вчера в 10:00');
        todayDate.restore();
    });

    it('should return month, date and time if date is not today and yesterday', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        let todayDate = sinon.useFakeTimers(new Date(2017, 1, 3, 15, 0));

        assert.equal(formatDate(date), '1 февраля в 10:00');
        todayDate.restore();
    });

    it('should return month, date, year and time if date is not from this year', () => {
        let date = new Date(2016, 1, 1, 10, 0);
        let todayDate = sinon.useFakeTimers(new Date(2017, 1, 3, 15, 0));

        assert.equal(formatDate(date), '1 февраля 2016 года в 10:00');
        todayDate.restore();
    });
});