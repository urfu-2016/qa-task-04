const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

describe('formatDate', () => {
	let clock;
	
	before(() => {
		const date = new Date(2017, 4, 1);
		
		clock = sinon.useFakeTimers(date.getTime());	
	});

    it('should add 0 before minutes for new Date(2017, 4, 1, 15, 09)', () => {
		const actual = formatDate(new Date(2017, 4, 1, 15, 09));
		
		assert.equal(actual, '15:09');
    });
	
    it('should add 0 before hours for new Date(2017, 4, 1, 07, 20)', () => {
		const actual = formatDate(new Date(2017, 4, 1, 07, 20));
		
		assert.equal(actual, '07:20');
    });	
	
    it('should return time for new Date(2017, 4, 1, 15, 09)', () => {
		const actual = formatDate(new Date(2017, 4, 1, 15, 09));
		
		assert.equal(actual, '15:09');
    });	

    it('should return вчера в time for new Date(2017, 3, 30, 15, 09)', () => {
		const actual = formatDate(new Date(2017, 3, 30, 15, 09));
		
		assert.equal(actual, 'вчера в 15:09');
    });	
	
    it('should return date month year time for new Date(2015, 3, 30, 15, 09)', () => {
		const actual = formatDate(new Date(2015, 3, 30, 15, 09));
		
		assert.equal(actual, '30 апреля 2015 года в 15:09');
    });
	
    it('should return date month time for new Date(2017, 0, 29, 15, 09)', () => {
		const actual = formatDate(new Date(2017, 0, 29, 15, 09));
		
		assert.equal(actual, '29 января в 15:09');
    });

	after(() => {
		clock.restore();	
	});
});