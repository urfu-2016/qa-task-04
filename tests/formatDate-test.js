'use strict';

const assert = require('assert');
const formatDate = require('../formatDate');

describe('formatDate', () => {
    it('should return ЧЧ:ММ, when date - today',  () => {
        var date = new Date(2017, 4, 3, 20, 9);
    const actual = formatDate(date, new Date(2017, 4, 3, 21, 9));

    assert.equal(actual, '20:09');
    });

    it('should return вчера в ЧЧ:ММ, when date - yesterday',  () => {
        var date = new Date(2017, 4, 2, 20, 9);
        const actual = formatDate(date, new Date(2017, 4, 3, 21, 9));

        assert.equal(actual, 'вчера в 20:09');
    });

    it('should return ДД ММ в ЧЧ:ММ, when date - another day',  () => {
        var date = new Date(2017, 4, 1, 20, 9);
        const actual = formatDate(date, new Date(2017, 4, 3, 21, 9));

        assert.equal(actual, '1 мая в 20:09');
    });

    it('should return ДД ММ в ЧЧ:ММ, when date - another month',  () => {
        var date = new Date(2017, 3, 10, 20, 9);
        const actual = formatDate(date, new Date(2017, 4, 3, 21, 9));

        assert.equal(actual, '10 апреля в 20:09');
    });

    it('should return ДД ММ ГГГГ года  в ЧЧ:ММ, when date - another year',  () => {
        var date = new Date(2016, 2, 2, 20, 9);
        const actual = formatDate(date,new Date(2017, 4, 3, 21, 9));

        assert.equal(actual, '2 марта 2016 года в 20:09');
    });

    it('Должен выкидывать ошибку, когда первый параметр превышает второй', () => {
        var date = new Date(2018, 2, 2, 20, 9);
        const cb = () => formatDate(date, new Date(2017, 4, 3, 21, 9));

        assert.throws(cb, /date не должен превышать dateNow/);
    });

    it('Должен выкидывать ошибку, когда параметры не типа Date', () => {
        var date = new Date(2016, 2, 2, 20, 9);
        const cb = () => formatDate(date, '2016, 2, 2, 20, 9');

        assert.throws(cb, /Входные параметры должны быть типа Date/);
    });

    it('Должен выкидывать ошибку, когда параметры не типа Date', () => {
        const cb = () => formatDate('2016, 2, 2, 20, 9', new Date(2016, 2, 2, 20, 9));

        assert.throws(cb, /Входные параметры должны быть типа Date/);
    });

    it('Должен выкидывать ошибку, когда параметры не типа Date', () => {
        const cb = () => formatDate('', '');

        assert.throws(cb, /Входные параметры должны быть типа Date/);
    });
});
