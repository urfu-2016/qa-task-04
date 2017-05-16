'use strict';

const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../formatDate');

const date = new Date(2017, 2, 25, 15, 9);
let clock;

describe('formatDate', () => {
    it('should return only time if message was written today', () => {
        const noZerosDate = new Date(2017, 2, 25, 15, 10);
        clock = sinon.useFakeTimers(new Date(2017, 2, 25, 16).getTime());
        assert.equal(formatDate(noZerosDate.toString()), '15:10');
        clock.restore();
    });

    it('should format hours with zero', () => {
        const zeroHours = new Date(2017, 2, 25, 9, 10);
        clock = sinon.useFakeTimers(new Date(2017, 2, 25, 16).getTime());
        assert.equal(formatDate(zeroHours.toString()), '09:10');
        clock.restore();
    });

    it('should format minutes with zero', () => {
        clock = sinon.useFakeTimers(new Date(2017, 2, 25, 16).getTime());
        assert.equal(formatDate(date.toString()), '15:09');
        clock.restore();
    });

    it('should format yesterday date', () => {
        clock = sinon.useFakeTimers(new Date(2017, 2, 26).getTime());
        assert.equal(formatDate(date.toString()), 'вчера в 15:09');
        clock.restore();
    });

    it('should format this year tweets', () => {
        clock = sinon.useFakeTimers(new Date(2017, 4).getTime());
        assert.equal(formatDate(date.toString()), '25 марта в 15:09');
        clock.restore();
    });

    it('should format other year tweets', () => {
        clock = sinon.useFakeTimers(new Date(2018, 0).getTime());
        assert.equal(formatDate(date.toString()), '25 марта 2017 года в 15:09');
        clock.restore();
    });

    it('should throw error if date is incorrect', () => {
        const incorrectDate = 'incorrect date';
        const cb = () => formatDate(incorrectDate);
        assert.throws(cb, /Неверный формат даты/);
    });

    it('should throw error if date is in future', () => {
        const clock = sinon.useFakeTimers(new Date(2016, 0).getTime());
        const cb = () => formatDate(date);
        assert.throws(cb, /Дата ещё не нступила/);
        clock.restore();
    });

    it('should return correct date for 1st January', () => {
        const clock = sinon.useFakeTimers(new Date(2018, 0, 1, 15, 9).getTime());
        assert.equal(formatDate(date.toString()), '25 марта 2017 года в 15:09');
        clock.restore();
    });
});
