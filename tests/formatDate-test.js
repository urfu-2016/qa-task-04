'use strict';

const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

describe('formatDate', () => {
    let fakeDate;
    before(() => {
        fakeDate = sinon.useFakeTimers(new Date(2017, 5, 17, 15, 0));
    });

    after(() => {
        fakeDate.restore();
    });

    it('should throw TypeError for not Date argument', () => {
        let cb = () => formatDate.formatDate('string');

        assert.throws(cb, /date should be Date/);
        assert.throws(cb, TypeError);
    });

    it('should throw Error for not valid date', () => {
        let notValidDate = new Date('string');
        let cb = () => formatDate.formatDate(notValidDate);

        assert.throws(cb, /date should be correct/);
    });

    it('should throw Error for date, which greater than current time', () => {
        let date = new Date(2027, 5, 15, 10, 0);
        let cb = () => formatDate.formatDate(date);
        assert.throws(cb, /date should not be greater than current date/);
    });

    it('should return only time if date is today', () => {
        let date = new Date(2017, 5, 17, 10, 0);
        assert.equal(formatDate.formatDate(date), '10:00');
    });

    it('should return `вчера в ` and time if date is yesterday', () => {
        let date = new Date(2017, 5, 16, 10, 0);
        assert.equal(formatDate.formatDate(date), 'вчера в 10:00');
    });

    it('should return month, date and time if date is not today and yesterday', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        assert.equal(formatDate.formatDate(date), '1 февраля в 10:00');
    });

    it('should return month, date, year and time if date is not from this year', () => {
        let date = new Date(2016, 1, 1, 10, 0);
        assert.equal(formatDate.formatDate(date), '1 февраля 2016 года в 10:00');
    });

    it('should add 0 in start if number has one digit', () => {
        let num = 3;
        assert.equal('03', formatDate.getFormattedNumber(num))
    });
});