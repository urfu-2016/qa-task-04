const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

function runSuccessTest(date, expected) {
    return () => {
        const clock = sinon.useFakeTimers(new Date('2017-04-26T15:09:10.609Z').getTime());
        const actual = formatDate(date);

        assert.equal(actual, expected); 
        clock.restore();
    }
}

describe('formatDate', () => {
    it('should return `14:29` for `2017-04-26T14:29:10.609Z`',
        runSuccessTest('2017-04-26T14:29:10.609Z', '14:29'));
        
    it('should return `15:09` for `2017-04-26T15:09:10.609Z`',
        runSuccessTest('2017-04-26T15:09:10.609Z', '15:09'));
        
    it('should return `вчера в 15:09` for `2017-04-25T15:09:10.609Z`',
        runSuccessTest('2017-04-25T15:09:10.609Z', 'вчера в 15:09'));
        
    it('should return `25 марта в 15:09` for `2017-03-25T15:09:10.609Z`',
        runSuccessTest('2017-03-25T15:09:10.609Z', '25 марта в 15:09'));

    it('should return `25 марта 2016 года в 15:09` for `2016-03-25T15:09:10.609Z`',
        runSuccessTest('2016-03-25T15:09:10.609Z', '25 марта 2016 года в 15:09'));
        
    it('should throw error when date is greater then the current date', () => {
        const clock = sinon.useFakeTimers(new Date('2017-04-26T15:09:10.609Z').getTime());
        const cb = () => formatDate('2018-03-25T15:09:10.609Z');

        assert.throws(cb, /Date is greater then the current date/);
        clock.restore();
    });

    it('should throw error when date is invalid', () => {
        const cb = () => formatDate('Invalid Date');

        assert.throws(cb, /Invalid Date/);
    });
    
    it('should throw error when length of arguments is not 1', () => {
        const cb = () => formatDate('2016-03-25T15:09:10.609Z', '2016-03-25T15:09:10.609Z');

        assert.throws(cb, /Length of arguments is not 1/);
    });
});
