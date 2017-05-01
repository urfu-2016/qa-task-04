const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../formatDate');

const date = new Date(2017, 5, 1, 4, 5);

describe('formatDate', () => {
  it('should return `Error` for empty arguments', () => {
    const actual = () => formatDate();

    assert.throws(actual, 'Argument must be a string');
  })

  const notStrings = [null, undefined, 123, true, [], {}, new Date]
  notStrings.forEach((key) => {
    it(`should return 'Error' for non string (${key}) arguments`, () => {
      const actual = () => formatDate(key);

      assert.throws(actual, 'Argument must be a string');
    })
  })

  it('should return `Error` for not date string', () => {
    const actual = () => formatDate('not a valid ISO string');

    assert.throws(actual, 'Argument must be a string in ISO date format');
  })

  it('should return todays time (without leading zeros) for todays date', () => {
    const anotherDate = new Date(2017, 5, 1, 14, 10);
    const clock = sinon.useFakeTimers(new Date(2017, 5, 1, 16).getTime());
    const actual = formatDate(anotherDate.toISOString());

    assert.equal(actual, `14:10`);
    clock.restore();
  });

  it('should return todays time (with leading zeros) for todays date', () => {
    const clock = sinon.useFakeTimers(new Date(2017, 5, 1).getTime());
    const actual = formatDate(date.toISOString());

    assert.equal(actual, `04:05`);
    clock.restore();
  });

  it('should return full string for past years', () => {
    const clock = sinon.useFakeTimers(new Date(2018, 5, 1).getTime());
    const actual = formatDate(date.toISOString());

    assert.equal(actual, `1 июня 2017 года в 04:05`);
    clock.restore();
  });

  it('should return date and time for current year', () => {
    const clock = sinon.useFakeTimers(new Date(2017, 4, 1).getTime());
    const actual = formatDate(date.toISOString());

    assert.equal(actual, `1 июня в 04:05`);
    clock.restore();
  });

  it('should return `yesterday` and time for yesterdays day', () => {
    const clock = sinon.useFakeTimers(new Date(2017, 5, 2).getTime());
    const actual = formatDate(date.toISOString());

    assert.equal(actual, `вчера 04:05`);
    clock.restore();
  });
})
