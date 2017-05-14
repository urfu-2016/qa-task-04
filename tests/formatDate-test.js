const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');


function runSuccessTest(nowDate, dateTweets, expected) {
    return () => {
        let clock = sinon.useFakeTimers(nowDate);
        const actual = formatDate(dateTweets);
        assert.equal(actual, expected);
        clock.restore();
    }
}
function runErrorTest(nowDate, dateTweets, expected) {
    return () => {
        const clock = sinon.useFakeTimers(nowDate);
        const cb = () => formatDate(dateTweets);
        assert.throws(cb, expected);
        clock.restore();
    }
}
describe('formatDate', () => {

    describe('good data', () => {
        let nowDate = new Date(2017, 4, 1, 23, 59);
        describe('"hh:mm" format', () => {
            it('should return hh:mm for date today" ',
                runSuccessTest(nowDate, new Date(2017, 4, 1, 15, 16), '15:16'));
            it('should return hh:mm for mm less than 10',
                runSuccessTest(nowDate, new Date(2017, 4, 1, 15, 6), '15:06'));
            it('should return hh:mm for  hh less than 10',
                runSuccessTest(nowDate, new Date(2017, 4, 1, 9, 9), '09:09'));

        });
        describe('"вчера в hh:mm" format', () => {
            it('should return hh:mm for date yesterday',
                runSuccessTest(nowDate, new Date(2017, 3, 30, 15, 9), 'вчера в 15:09'));
        });

        describe('"dd month в hh:mm" format', () => {
            it('should return hh:mm for date this year',
                runSuccessTest(nowDate, new Date(2017, 3, 29, 15, 9), '29 апреля в 15:09'));
        });

        describe('"dd month year года в hh:mm" format', () => {
            it('should return hh:mm for last day last year', runSuccessTest(nowDate, new Date(2016, 11, 31, 23, 59),
                '31 декабря 2016 года в 23:59'));
        });
    });

    describe('bad data', () => {
        let nowDate = new Date(2017, 4, 1, 23, 59);
        it('should throw error if date is invalid',
            runErrorTest(nowDate, 'I am invalid date', /Неверный формат даты/));
        it('should throw error if date is in future',
            runErrorTest(nowDate, new Date(2017, 4, 1, 24, 0),/Дата твита больше текущей/));
    });
});
