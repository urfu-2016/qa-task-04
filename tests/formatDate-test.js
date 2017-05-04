'use strict';

const sinon = require('sinon');
const assert = require('assert');
const formatDate = require('../formatDate');

describe('formatDate', () => {

    var clock;
    beforeEach(() => { clock = sinon.useFakeTimers(new Date(2017, 4, 4, 21, 0)); });
    afterEach(() => { clock.restore(); });

    it('должен возвращать данные в формате: ЧЧ:ММ, когда дата - сегодняшняя',  () => {
        var date = new Date(2017, 4, 4, 20, 9);
    const actual = formatDate(date);

    assert.equal(actual, '20:09');
    });

    it('должен возвращать данные в формате: вчера ЧЧ:ММ, когда дата - вчерашняя',  () => {
        var date = new Date(2017, 4, 3, 20, 9);
        const actual = formatDate(date);

        assert.equal(actual, 'вчера в 20:09');
    });

    it('должен возвращать данные в формате: ДД ММ в ЧЧ:ММ, когда дата - другой день',  () => {
        var date = new Date(2017, 4, 1, 20, 9);
        const actual = formatDate(date);

        assert.equal(actual, '1 мая в 20:09');
    });

    it('должен возвращать данные в формате: ДД ММ в ЧЧ:ММ, когда дата - другой месяц',  () => {
        var date = new Date(2017, 3, 10, 20, 9);
        const actual = formatDate(date);

        assert.equal(actual, '10 апреля в 20:09');
    });

    it('должен возвращать данные в формате: ДД ММ ГГГГ года в ЧЧ:ММ, когда дата - другой год',  () => {
        var date = new Date(2016, 2, 2, 20, 9);
        const actual = formatDate(date);

        assert.equal(actual, '2 марта 2016 года в 20:09');
    });


    it('должен возвращать ошибку, когда данные некорректны',  () => {
        var date = new Date('lalala');
        const cb = () => formatDate(date);

        assert.throws(cb, /Входной параметр должны содержать корректные данные/);
    });

    it('должен выкидывать ошибку, когда дата сообщения превышает текущую дату', () => {
        var date = new Date(2018, 2, 2, 20, 9);
        const cb = () => formatDate(date);

        assert.throws(cb, /date не должен превышать текущую дату/);
    });

    it('должен выкидывать ошибку, когда параметр не типа Date', () => {
        const cb = () => formatDate('2017-04-25T15:09:10.609Z');

        assert.throws(cb, /Входной параметр должны быть типа Date/);
    });

    it('должен выкидывать ошибку, когда параметр не передали', () => {
        const cb = () => formatDate();

        assert.throws(cb, /Входной параметр должны быть типа Date/);
    });
});
