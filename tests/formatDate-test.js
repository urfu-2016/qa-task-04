'use strict';

const assert = require('assert');

const formatDate = require('../formatDate').formatDate;
const months = require('../formatDate').months;

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
    let todayDate = new Date(Date.now());
    let minutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : todayDate.getMinutes();
    let time = `${todayDate.getHours()}:${minutes}`;

    it('should return short today date', () => {
        assert.equal(formatDate(todayDate.toISOString()), time);
    });

    it('should return short date with "yesterday" word', () => {
        todayDate.setDate(todayDate.getDate() - 1);

        assert.equal(formatDate(todayDate.toISOString()), `вчера в ${time}`);
    });

    it('should return short date with date num', () => {
        todayDate.setDate(todayDate.getDate() - 1);

        let date = todayDate.getDate();
        let month = months[todayDate.getMonth()];

        assert.equal(formatDate(todayDate.toISOString()), `${date} ${month} в ${time}`);
    });

    it('should return full date', () => {
        todayDate.setFullYear(todayDate.getFullYear() - 1);

        let date = todayDate.getDate();
        let month = months[todayDate.getMonth()];
        let year = todayDate.getFullYear();

        assert.equal(formatDate(todayDate.toISOString()), `${date} ${month} ${year} года в ${time}`);
    });
});