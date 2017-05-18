'use strict';

const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

describe('formatDate', () => {
    it('should return `00:00` for new Date(2017, 4, 3, 0, 0, 0, 0)', () => {
		const today = sinon.useFakeTimers(new Date(2017, 5, 3, 10, 10));
		const date =  formatDate(new Date(2017, 5, 3, 0, 0, 0, 0));

		assert.equal(date, '00:00');
		today.restore();
    });
	
	it('should return `вчера в 00:00` for new Date(2017, 4, 2, 0, 0, 0, 0)', () => {
		const today = sinon.useFakeTimers(new Date(2017, 5, 3, 0, 0));
        const date =  formatDate(new Date(2017, 5, 2, 0, 0, 0, 0));

        assert.equal(date, 'вчера в 00:00');
		today.restore();
    });
	
	it('should return `3 марта в 00:00` for new Date(2017, 2, 3, 0, 0, 0, 0)', () => {
		const today = sinon.useFakeTimers(new Date(2017, 5, 3, 0, 0));
        const date =  formatDate(new Date(2017, 2, 3, 0, 0, 0, 0));
		
        assert.equal(date, '3 марта в 00:00');
		today.restore();
    });
	
	it('should return `3 марта 2016 года в 00:00` for new Date(2016, 2, 3, 0, 0, 0, 0)', () => {
		const today = sinon.useFakeTimers(new Date(2017, 5, 3, 0, 0));
        const date =  formatDate(new Date(2016, 2, 3, 10, 0, 0, 0));

        assert.equal(date, '3 марта 2016 года в 10:00');
		today.restore();
    });
	
	it('should return `Аргумент должен быть типа Date` for "I`m not a date"', () => {
        const date = () => formatDate("I'm not a date");
        
        assert.throws(date, /Аргумент должен быть типа Date/);
    });
	
	it('should return `Неправильный формат даты` for new Date("I`m not a date")', () => {
        const date = () => formatDate(new Date("I`m not a date"));
        
        assert.throws(date, /Неправильный формат даты/);
    });
	
	it('should return `Дата не должна быть больше текущей` for new Date(2018, 2, 3, 0, 0, 0, 0)', () => {
		const today = sinon.useFakeTimers(new Date(2017, 5, 3, 0, 0));
        const date = () => formatDate(new Date(2018, 2, 3, 0, 0, 0, 0));
		
        assert.throws(date, /Дата не должна быть больше текущей/);
		today.restore();
    });
	
	it('should return `На входе должен быть один аргумент` for "(date, date)"', () => {
		const date1 =  formatDate(new Date(2017, 2, 3, 0, 0, 0, 0));
		const date2 =  formatDate(new Date(2016, 2, 3, 0, 0, 0, 0));
        const date = () => formatDate(date1, date2);
        
        assert.throws(date, /На входе должен быть один аргумент/);
    });
	
	it('should return `На входе должен быть один аргумент` for "()"', () => {
        const date = () => formatDate();
        
        assert.throws(date, /На входе должен быть один аргумент/);
    });
});
