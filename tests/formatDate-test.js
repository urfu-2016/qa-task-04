'use strict';

const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

describe('formatDate', () => {
    let fakeDate;
    beforeEach(function() {
        fakeDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());
    });

    it('should return only time if today', () => {
        const pastDate = new Date(2017, 4, 2, 19, 23);
        assert.equal(formatDate(pastDate.toString()), '19:23');
        fakeDate.restore();
    });

    it('should return only time with zero if today', () => {
        const pastDate = new Date(2017, 4, 2, 9, 3);
        assert.equal(formatDate(pastDate.toString()), '09:03');
        fakeDate.restore();
    });

    it('should return `вчера` date - if date is yesterday', () => {
        const pastDate = new Date(2017, 4, 1, 19, 23);
        assert.equal(formatDate(pastDate.toString()), 'вчера в 19:23');
        fakeDate.restore();
    });

    it('should return in this year date - if date in this year', () => {
        const pastDate = new Date(2017, 2, 12, 19, 23);
        assert.equal(formatDate(pastDate.toString()), '12 марта в 19:23');
        fakeDate.restore();
    });

    it('should return in last year date - if date in last year', () => {
        const pastDate = new Date(2016, 2, 12, 19, 23);
        assert.equal(formatDate(pastDate.toString()), '12 марта 2016 года в 19:23');
        fakeDate.restore();
    });

    it('should throw error if date is incorrect', () => {
        const pastDate = 'Invalid Date';
        const error = () => formatDate(pastDate.toString());
        assert.throws(error, /Date should not invalid/);
        fakeDate.restore();
    });

    it('should throw error if date is in future', () => {
        const pastDate = new Date(2018, 2, 12, 19, 23);
        const error = () => formatDate(pastDate.toString());
        assert.throws(error, /Choose date should be earlier today/);
        fakeDate.restore();
    });
});