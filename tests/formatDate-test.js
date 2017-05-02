const assert = require('assert');
const formateDate = require('../formatDate');
const sinon = require('sinon');

describe('formatDate', () => {
    let clock;

    afterEach(() => {
        clock.restore();
    });

    describe('Positive test', () => {
        it('should return hh:mm for today date', () => {
            const todayTime = new Date(2017, 4, 1, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());
            const actual = formateDate(todayTime.toString());

            assert.equal(actual, '05:15');
        });

        it('should return "вчера в hh:mm" for yesterday date', () => {
            const yesterdayTime = new Date(2017, 3, 30, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());
            const actual = formateDate(yesterdayTime.toString());

            assert.equal(actual, 'вчера в 05:15');
        });

        it('should return "dd month в hh:mm" for more day ago date', () => {
            const dayAgoTime = new Date(2017, 3, 29, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());
            const actual = formateDate(dayAgoTime.toString());

            assert.equal(actual, '29 апреля в 05:15');
        });

        it('should return "dd month yy года в hh:mm" for more year ago date', () => {
            const yearAgoTime = new Date(2016, 3, 29, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());
            const actual = formateDate(yearAgoTime.toString());

            assert.equal(actual, '29 апреля 2016 года в 05:15');
        });
    });

    describe('Negative test', () => {
        it('should throw Error if more than one argument', () => {
            const correctTime = new Date(2017, 3, 29, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());

            const cb = () => formateDate(correctTime.toString(), 'second argument');
            assert.throws(cb, /Функция принимает ровно 1 параметр/);
        });

        it('should throw Error if less than one argument', () => {
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());

            const cb = () => formateDate();
            assert.throws(cb, /Функция принимает ровно 1 параметр/);
        });

        it('should throw Error if argument is not date', () => {
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());

            const cb = () => formateDate('not date');
            assert.throws(cb, /В качестве аргумента передан неверный формат даты/);
        });

        it('should throw Error if current date less argument date', () => {
            const incorrectDate = new Date(2018, 3, 29, 5, 15);
            clock = sinon.useFakeTimers(new Date(2017, 4, 1, 12).getTime());

            const cb = () => formateDate(incorrectDate.toString());
            assert.throws(cb, /Время не может быть больше текущего/);
        });
    });
});
