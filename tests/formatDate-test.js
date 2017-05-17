'use strict';

const assert = require('assert');
const sinon = require('sinon');

const formatDate = require('../formatDate');


describe('formatDate exception tests', () => {
    it('should return exception when call without argument', () => {
        const actual = () => formatDate();

        assert.throws(actual, new RegExp('Need pass one argument'));
    });


    it('should return exception when call with wrong type argument', () => {
        const actual = () => formatDate(1);

        assert.throws(actual, new RegExp('Wrong type argument'));
    });

    it('should return exception when call with invalid argument', () => {
        const actual = () => formatDate(':<');

        assert.throws(actual, new RegExp('Invalid format string'));
    });
});

describe('formatDate tests', () => {
    let clock;
    let date;

    before(() => {
        clock = sinon.useFakeTimers(new Date(2017, 4, 5, 12, 30));
        date = new Date();
    });


    it('should return short today date', () => {
        assert.equal(formatDate(date.toISOString()), '12:30');
    });

    it('should return short date with "yesterday" word', () => {
        date.setDate(date.getDate() - 1);

        assert.equal(formatDate(date.toISOString()), 'вчера в 12:30');
    });

    it('should return short date with date num', () => {
        date.setDate(date.getDate() - 1);

        assert.equal(formatDate(date.toISOString()), '3 мая в 12:30');
    });

    it('should return full date', () => {
        date.setMinutes(date.getMinutes() - 25);
        date.setFullYear(date.getFullYear() - 1);

        assert.equal(formatDate(date.toISOString()), '3 мая 2016 года в 12:05');
    });

    after(() => {
        clock.restore();
    });
});