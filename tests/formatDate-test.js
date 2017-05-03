const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

function runSuccessTest(date, expected) {
    return () => {
        const actual = formatDate(date);

        assert.equal(actual, expected);
    }
}

function runErrorTest(date, error) {
    return () => {
        const cb = () => formatDate(date);

        assert.throws(cb, error);
    }
}

describe('formatDate', () => {
    describe('black box', () => {
        let clock;
        beforeEach(() => {
            clock = sinon.useFakeTimers(Date.parse('2017-04-26T23:59:59+05:00'));
        });
        afterEach(() => {
            clock.restore();
        });
        // Текущая дата имитирована следующая: 2017-04-26T23:59:59+05:00
        it(`should return '14:40' for 2017-04-26T14:40:10+05:00`,
            runSuccessTest('2017-04-26T14:40:10+05:00', '14:40'));
        it(`should return 'вчера в 21:40' for 2017-04-25T14:40:10-02:00`,
            runSuccessTest('2017-04-25T14:40:10-02:00', 'вчера в 21:40'));
        it(`should return '25 марта в 15:09' for 2017-03-25T10:09:10.609Z`,
            runSuccessTest('2017-03-25T10:09:10.609Z', '25 марта в 15:09'));
        it(`should return '25 марта 2016 года в 15:09' for 2016-03-25T10:09:10.609Z`,
            runSuccessTest('2016-03-25T10:09:10.609Z', '25 марта 2016 года в 15:09'));

        it(`should return '23:59' for 2017-04-26T23:59:59+05:00`,
            runSuccessTest('2017-04-26T23:59:59+05:00', '23:59'));
        it(`should return '00:00' for 2017-04-26T00:00:00+05:00`,
            runSuccessTest('2017-04-26T00:00:00+05:00', '00:00'));

        it(`should throw error when date is bigger than current`,
            runErrorTest('2017-04-27T14:40:10+05:00', /Дата не может быть больше системной/));
        it(`should throw error when date is null`,
            runErrorTest(null, /Неправильный формат даты/));
        it(`should throw error when date isn't passed`,
            runErrorTest(undefined, /Неправильный формат даты/));
        it(`should throw error when date is NaN`,
            runErrorTest(NaN, /Неправильный формат даты/));
        it(`should throw error when date format is invalid`,
            runErrorTest('this is invalid date format', /Неправильный формат даты/));
    });
});