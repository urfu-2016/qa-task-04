const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');

function setHoursAndMinutes(date, hours, mins) {
  date.setHours(hours);
  date.setMinutes(mins);
}

function setFakeTimer(year, month, day) {
  return sinon.useFakeTimers(new Date(year,month,day, 23, 59).getTime());
}

function formarDateError(errRegExp, ...args) {
  const f = () => formatDate(...args);
  assert.throws(f, errRegExp);
}

describe('formatDate', () => {
  describe('formatDate format tests', () => {
    let clock;
    
    afterEach(() => {
      clock.restore();
    })
    
    describe('"hh:mm" format', () => {
      it('should return only hh:mm for today date', () => {
        clock = setFakeTimer(2011,5,1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        assert.equal(formatDate(nowDate), '10:10');
      });
      it('should return correct hh:mm for hh and mm less than 10', () => {
        clock = setFakeTimer(2011,5,1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 5, 9);
        assert.equal(formatDate(nowDate), '05:09');
      });
    });
    describe('"вчера в hh:mm" format', () => {
      it('should return "вчера в hh:mm" for yesterday date', () => {
        clock = setFakeTimer(2011,5,5);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 1);
        assert.equal(formatDate(nowDate), 'вчера в 10:10');
      });
      it('should return "вчера в hh:mm" for first day of month', () => {
        clock = setFakeTimer(2011,5,1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 1);
        assert.equal(formatDate(nowDate), 'вчера в 10:10');
      });
      it('should return "вчера в hh:mm" for 1 January', () => {
        clock = setFakeTimer(2011,0,1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 1);
        assert.equal(formatDate(nowDate), 'вчера в 10:10');
      });
    })
    describe('"dd month в hh:mm" format', () => {
      it('should return full format without year for two days ago', () => {
        clock = setFakeTimer(2011,0,15);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 2);
        assert.equal(formatDate(nowDate), '13 января в 10:10');
      });
      it('should return full format without year for two days ago for first day of month', () => {
        clock = setFakeTimer(2011,5,1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 2);
        assert.equal(formatDate(nowDate), '30 мая в 10:10');
      });
    });
    describe('"dd month year года в hh:mm" format', () => {
      it('should return full format for two days ago for 1 January', () => {
        clock = setFakeTimer(2011, 0, 1);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setDate(nowDate.getDate() - 2);
        assert.equal(formatDate(nowDate), '30 декабря 2010 года в 10:10');
      });
      it('should return full format for two days ago for last year', () => {
        clock = setFakeTimer(2011, 4, 21);
        const nowDate = new Date();
        setHoursAndMinutes(nowDate, 10, 10);
        nowDate.setFullYear(nowDate.getFullYear() - 1);
        assert.equal(formatDate(nowDate), '21 мая 2010 года в 10:10');
      });
    });
  });
  describe('exceptions', () => {
    it('should return "formatDate take 1 argument" error if not 1 argument', () => {
      formarDateError(/formatDate take 1 argument/, new Date(), new Date());
    });
    it('should return "Invalid date" error if "undefined" in args', () => {
      formarDateError(/Invalid date/, undefined);
    });
    it('should return "Invalid date" error if "abcdef" (incorrect format data) in args', () => {
      formarDateError(/Invalid date/, 'abcdef');
    });
    it('should return "Date must be before current date" error if date after current date', () => {
      let nowDate = new Date();
      nowDate.setHours(nowDate.getHours() + 1);
      formarDateError(/Date must be before current date/, nowDate);
    });
  });
});