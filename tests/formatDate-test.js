'use strict';

const formatDate = require('../app/formatDate');
const chai = require('chai');
chai.should();

describe('formatDate', () => {
    it('should return only time when pastDate - today', () => {
        let pastDate = new Date(2017, 10, 1, 20, 40);
        let currentDate = new Date(2017, 10, 1, 20, 45);

        formatDate(pastDate, currentDate).should.equal('20:40');
    });

    it('should prepend `вчера в` when pastDate - yesterday', () => {
        let pastDate = new Date(2017, 11, 2, 10, 30);
        let currentDate = new Date(2017, 11, 3, 23, 30);

        formatDate(pastDate, currentDate).should.equal('вчера в 10:30');        
    });

    it('should prepend date when pastDate - this year', () => {
        let pastDate = new Date(2017, 9, 3, 18, 0);
        let currentDate = new Date(2017, 11, 2, 10, 30);

        formatDate(pastDate, currentDate).should.equal('4 октября в 18:00');
    });

    it('should prepend date and year when pastDate - last year', () => {
        let pastDate = new Date(2016, 1, 1, 10, 10);
        let currentDate = new Date(2017, 10, 3, 3, 30);

        formatDate(pastDate, currentDate).should.equal('2 февраля 2016 года в 10:10');
    });

    it('should pad zero in time when hours and minutes one digit', () => {
        let pastDate = new Date(2017, 10, 1, 9, 0);
        let currentDate = new Date(2017, 10, 1, 9, 10);

        formatDate(pastDate, currentDate).should.equal('09:00');
    });

    it('should throws when pastDate > currentDate', () => {
        let pastDate = new Date(2018, 1, 1, 10, 10);
        let currentDate = new Date(2017, 10, 3, 3, 30);
        
        formatDate.bind(null, pastDate, currentDate)
            .should.throw('`pastDate` should be less then current');
    });

    it('should throws when any date is invalid', () => {
        let correctDate = new Date();
        let invalidDate = new Date('invalid date');

        formatDate.bind(null, correctDate, invalidDate)
            .should.throw('Dates should be valid');
        formatDate.bind(null, invalidDate, correctDate)
            .should.throw('Dates should be valid');
    });
});