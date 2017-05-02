const sinon = require('sinon');
const assert = require('assert');
const formatDate = require('../formatDate');


function runSuccessTest(dateForFormatting, expected)
{
    return () =>
    {
        const actual = formatDate(dateForFormatting);
        assert.equal(actual, expected);
    }
}

function runFailTest(dateForFormatting, expected)
{
    return () =>
    {
        const cb = () => formatDate(dateForFormatting);
        assert.throws(cb, expected);
    }
}


describe('formatDate', () =>
{
    var clock;
    beforeEach(function () { clock = sinon.useFakeTimers(new Date(2013, 5, 14, 18, 56)); });
    afterEach(function () { clock.restore(); });

    describe('Valid data', () =>
    {
        it('Should return "14 июня 2012 года в 18:56" for 14.05.2012 18:56',
            runSuccessTest(new Date(2012, 5, 14, 18, 56).toString(), '14 июня 2012 года в 18:56'));
        it('Should return "14 мая в 18:56" for 14.04.2013 18:56',
            runSuccessTest(new Date(2013, 4, 14, 18, 56).toString(), '14 мая в 18:56'));
        it('Should return "вчера в 18:56" for 13.05.2013 18:56',
            runSuccessTest(new Date(2013, 5, 13, 18, 56).toString(), 'вчера в 18:56'));
        it('Should return "15:03" for 14.05.2013 15:03',
            runSuccessTest(new Date(2013, 5, 14, 15, 3).toString(), '15:03'));
        it('Should return "11:22" for 14.05.2013 11:22',
            runSuccessTest(new Date(2013, 5, 14, 11, 22).toString(), '11:22'));
    });

    describe('Invalid data', () =>
    {
        it('Should throw error when date is not a string',
            runFailTest(null, /The date must be passed as a string!/));
        it('Should throw error when date is more than current',
            runFailTest(new Date(2018, 5, 14, 11, 22).toString(), /Date can not be more than current!/));
    });
});
