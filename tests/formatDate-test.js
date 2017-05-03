'use strict';

const formatDate = require('../formatDate');
const assert = require('assert');

describe('formatDate', () => {
    it('should return TypeError for not Date argument', () => {
        let cb = () => formatDate('not Date');

        assert.throws(cb, /date should be Date/);
        assert.throws(cb, TypeError);
    });

    it('should return Error for not valid date', () => {
        let notValidDate = new Date('hello, world!');
        let cb = () => formatDate(notValidDate);

        assert.throws(cb, /date should be correct/);
    });

    it('should return Error for date, which greater than current time', () => {
        let date = new Date();
        date.setYear(date.getFullYear() + 1);
        let cb = () => formatDate(date);

        assert.throws(cb, /date should not be greater than current date/);
    });


});