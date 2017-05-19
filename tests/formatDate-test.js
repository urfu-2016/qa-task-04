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
        let cb = () => formatDate('string');

        assert.throws(cb, /date should be Date/);
        assert.throws(cb, TypeError);
    });

    it('should throw Error for not valid date', () => {
        let notValidDate = new Date('string');
        let cb = () => formatDate(notValidDate);

        assert.throws(cb, /date should be correct/);
    });

    it('should throw Error for date, which greater than current time', () => {
        let date = new Date(2027, 5, 15, 10, 0);
        let cb = () => formatDate(date);
        assert.throws(cb, /date should not be greater than current date/);
    });

    it('should return only time if date is today', () => {
        let date = new Date(2017, 5, 17, 10, 0);
        assert.equal(formatDate(date), '10:00');
    });

    it('should return `вчера в ` and time if date is yesterday', () => {
        let date = new Date(2017, 5, 16, 10, 0);
        assert.equal(formatDate(date), 'вчера в 10:00');
    });

    it('should return month, date and time if date is not today and yesterday', () => {
        let date = new Date(2017, 1, 1, 10, 0);
        assert.equal(formatDate(date), '1 февраля в 10:00');
    });

    it('should return month, date, year and time if date is not from this year', () => {
        let date = new Date(2016, 1, 1, 10, 0);
        assert.equal(formatDate(date), '1 февраля 2016 года в 10:00');
    });

    it('should add 0 in start if hours has one digit', () => {
        let date = new Date(2017, 5, 17, 9, 16);
        assert.equal('09:16', formatDate(date));
    });

    it('should add 0 in start if minutes has one digit', () => {
        let date = new Date(2017, 5, 17, 14, 9);
        assert.equal('14:09', formatDate(date));
    });
});