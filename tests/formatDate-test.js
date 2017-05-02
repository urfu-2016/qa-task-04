'use strict';

const formatDate = require('../formatDate');
const assert = require('assert');
const sinon = require('sinon');

describe('formatDate', () => {
    it('should return only time if today', () => {
        const chooseDate = new Date(2017, 4, 2, 19, 23);
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());

        assert.equal(formatDate(chooseDate.toString()), '19:23');
        todayDate.restore();
    });

    it('should return `вчера` date - if date is yesterday', () => {
        const chooseDate = new Date(2017, 4, 1, 19, 23);
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());

        assert.equal(formatDate(chooseDate.toString()), 'вчера в 19:23');
        todayDate.restore();
    });

    it('should return in this year date - if date in this year', () => {
        const chooseDate = new Date(2017, 2, 12, 19, 23);
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());

        assert.equal(formatDate(chooseDate.toString()), '12 марта в 19:23');
        todayDate.restore();
    });

    it('should return in last year date - if date in last year', () => {
        const chooseDate = new Date(2016, 2, 12, 19, 23);
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());

        assert.equal(formatDate(chooseDate.toString()), '12 марта 2016 года в 19:23');
        todayDate.restore();
    });


    it('should throw error if date is incorrect', () => {
        const chooseDate = 'Invalid Date';
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());
        const error = () => formatDate(chooseDate.toString());

        assert.throws(error, /Date should not invalid/);
        todayDate.restore();
    });


    it('should throw error if date is in future', () => {
        const chooseDate = new Date(2018, 2, 12, 19, 23);
        const todayDate = sinon.useFakeTimers(new Date(2017, 4, 2, 22, 50).getTime());
        const error = () => formatDate(chooseDate.toString());

        assert.throws(error, /Choose date should be earlier today/);
        todayDate.restore();
    });
});