const assert = require('assert');
const formatDate = require('../formatDate');
const moment = require('moment');

describe('formatDate', () => {

    /** Положительные тесты*/
    it(`should return ${moment().format('HH:mm')} for ${moment().format()}`, () => {
        const actual = formatDate(moment().format());

        assert.equal(actual, moment().format('HH:mm'));
    });

    it(`should return вчера в ${moment().format('HH:mm')} for ${moment().subtract(1, 'days').format()}`, () => {
        const actual = formatDate(moment().subtract(1, 'days').format());

        assert.equal(actual, `вчера в ${moment().format('HH:mm')}`);
    });

    it('should return `25 марта в 15:09` for 2017-03-25T15:09', () => {
        const actual = formatDate('2017-03-25T15:09');

        assert.equal(actual, '25 марта в 15:09');
    });

    it('should return `25 марта 2016 года в 16:09` for 2016-03-25T16:09:10.609Z', () => {
        const actual = formatDate('2016-03-25T16:09:10.609Z');

        assert.equal(actual, '25 марта 2016 года в 16:09');
    });

    /** Негативные тесты */
    [null, undefined, NaN, {}, [], 12342].forEach(item => {
        it(`should throw Аргумент должен быть строкой! for ${item}`, () => {
            assert.throws(() => formatDate(item), 'Аргумент должен быть строкой!');
        });
    })

    it(`should throw Аргумент должен быть в формате даты! for 234fds`, () => {
        assert.throws(() => formatDate('234fds'), 'Аргумент должен быть в формате даты!');
    });

    it(`should throw Дата не может быть в будущем времени! ${moment().add(5, 'days').format()}`, () => {
        assert.throws(() => formatDate(moment().add(5, 'days').format()), 'Дата не может быть в будущем времени!');
    });
});

