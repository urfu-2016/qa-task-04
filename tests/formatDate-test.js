const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

function fakeTimer(year, month, day, hour, min) {
    return sinon.useFakeTimers(new Date(year, month, day, hour, min));
}

fakeTimer(2015, 5, 10, 6, 20);

describe('formatDate testing', () => {
    it('should return 04:22', () => {
        const tweetDate = new Date(2015, 5, 10, 4, 22);
        const actual = formatDate(tweetDate);

        assert.equal(actual, '04:22');
    });

    it('should return вчера в 04:22', () => {
        const tweetDate = new Date(2015, 5, 9, 4, 22);
        const actual = formatDate(tweetDate);

        assert.equal(actual, 'вчера в 04:22');
    });

    it('should return 9 февраля в 00:22', () => {
        const tweetDate = new Date(2015, 1, 8, 0, 22);
        const actual = formatDate(tweetDate);

        assert.equal(actual, '9 февраля в 00:22');
    });

    it('should return 19 октября 2014 года в 22:22', () => {
        const tweetDate = new Date(2014, 9, 18, 22, 22);
        const actual = formatDate(tweetDate);

        assert.equal(actual, '19 октября 2014 года в 22:22');
    });

    it('should return there should be only one argument', () => {
        const actual = () => formatDate();

        assert.throws(actual, 'there should be only one argument');
    });

    it('should return there should be only one argument', () => {
        const argDate1 = new Date();
        const argDate2 = new Date();
        const actual = () => formatDate(argDate1, argDate2);

        assert.throws(actual, 'there should be only one argument');
    });

    it('should return argument should be a date from past', () => {
        const futureDate = new Date(2017, 10, 10, 10, 10);
        const actual = () => formatDate(futureDate);

        assert.throws(actual, 'argument should be a date from past');
    });

    it('should return argument should be a date', () => {
        const actual = () => formatDate('date');

        assert.throws(actual, 'argument should be a date');
    });
})
