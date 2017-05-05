'use strict';

const formatDate = require('../app/formatDate');
const sinon = require('sinon');
const chai = require('chai');
chai.should();

describe('formatDate', () => {
    let clock;
    function useFakeTimers(date) {
        clock = sinon.useFakeTimers(date);
    }

    afterEach(() => {
        !clock || clock.restore();
    });

    it('should return only time when pastDate is today', () => {
        let pastDate = new Date(2017, 10, 1, 20, 40);
        useFakeTimers(new Date(2017, 10, 1, 20, 45));

        formatDate(pastDate).should.equal('20:40');
    });

    it('should prepend `вчера в` when pastDate is yesterday', () => {
        let pastDate = new Date(2017, 11, 2, 10, 30);
        useFakeTimers(new Date(2017, 11, 3, 23, 30));

        formatDate(pastDate).should.equal('вчера в 10:30');        
    });

    it('should prepend date when pastDate in this year', () => {
        let pastDate = new Date(2017, 9, 3, 18, 0);
        useFakeTimers(new Date(2017, 11, 2, 10, 30));

        formatDate(pastDate).should.equal('4 октября в 18:00');
    });

    it('should prepend date and year when pastDate in last year', () => {
        let pastDate = new Date(2016, 1, 1, 10, 10);
        useFakeTimers(new Date(2017, 10, 3, 3, 30));

        formatDate(pastDate).should.equal('2 февраля 2016 года в 10:10');
    });

    it('should pad zero in time when hours and minutes one digit', () => {
        let pastDate = new Date(2017, 10, 1, 9, 0);
        useFakeTimers(new Date(2017, 10, 1, 9, 10));

        formatDate(pastDate).should.equal('09:00');
    });

    it('should throws TypeError when pass not Date', () => {
        (() => formatDate('not Date'))
            .should.throws(TypeError, '`pastDate` should has type Date');
    });

    it('should throws when date is invalid', () => {
        (() => formatDate(new Date('invalid date')))
            .should.throws('`pastDate` should be valid');
    });

    it('should throws when pastDate > currentDate', () => {
        let pastDate = new Date(2018, 1, 1, 10, 10);
        useFakeTimers(new Date(2017, 10, 3, 3, 30));
        
        (() => formatDate(pastDate))
            .should.throws('`pastDate` should be less then current date');
    });
});