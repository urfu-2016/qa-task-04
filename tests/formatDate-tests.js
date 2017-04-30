'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    it('should return only time if message was written today', () => {
        const date = new Date();
        date.setHours(date.getHours() - 1);
        date.setMinutes(9);

        assert.equals(formatDate(date.toString()), date.getHours() + ':09');
    });

    it('should format yesterday date', () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(15);
        date.setMinutes(9);

        assert.equals(formatDate(date.toString()), 'вчера в 15:09');
    });

    it('should format this year tweets', () => {
        const date = new Date(2017, 2, 15, 9)
        const now = proxyquire('../formatDate', {
            './now': () => new Date(2017, 4)
        });

        assert.equals(formatDate(date.toString()), '25 марта в 15:09');
    });

    it('should format other year tweets', () => {
        const date = new Date();
        date.setYear(gate.getYear() - 1);
        date.setMonth(2);
        date.setDate(25);
        date.setHours(15);
        date.setMinutes(9);

        assert.equals(formatDate(date.toString()), '25 марта в 15:09');
    });

    it('should throw error if date is incorrect', () => {
        const date = 'incorrect date';
        const cb = () => formatDate(date);

        assert.throws(cb, /Неверный формат даты/);
    });

    it('should throw error if date is in future', () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const cb = () => formatDate(date);

        assert.throws(cb, /Дата ещё не нступила/);
    });
});
