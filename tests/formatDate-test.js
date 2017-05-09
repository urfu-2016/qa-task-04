'use strict';

const assert = require('assert');
const proxyQuire = require('proxyquire');

function createFormatDate(...dateArgs) {
    return proxyQuire('../formatDate', {
        './getCurrentDate': () => createUTCDate(...dateArgs)
    })
}

function createUTCDate(...args) {
    return new Date(Date.UTC(...args));
}

describe('formatDate', () => {
    const formatDate = createFormatDate(2017, 10, 2);

    it('should return `XX:XX` for today', () => {
        const testDate = createUTCDate(2017, 10, 2, 11, 10).toISOString();

        const actual = formatDate(testDate);

        assert.equal(actual, '11:10');
    });

    it('should return `вчера в XX:XX` for yesterday', () => {
        const testDate = createUTCDate(2017, 10, 1, 1, 2).toISOString();

        const actual = formatDate(testDate);

        assert.equal(actual, 'вчера в 01:02');
    });

    it('should return `вчера в XX:XX` if yesterday was in previous year', () => {
        const formatDate = createFormatDate(2017, 0, 1);
        const testDate = createUTCDate(2016, 11, 31, 1, 2).toISOString();

        const actual = formatDate(testDate);

        assert.equal(actual, 'вчера в 01:02');
    });

    it('should return `{day} {month} в XX:XX` for other month', () => {
        const testDate = createUTCDate(2017, 8, 9, 15, 9).toISOString();

        const actual = formatDate(testDate);

        assert.equal(actual, '9 сентября в 15:09');
    });

    it('should return `{day} {month} {year} года в XX:XX` for another year', () => {
        const testDate = createUTCDate(2016, 8, 9, 15, 9).toISOString();

        const actual = formatDate(testDate);

        assert.equal(actual, '9 сентября 2016 года в 15:09');
    });
});
