const assert = require('assert');
const showTweets = require('../showTweets');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const mockTweets = [
  {
    'created_at': '2017-04-30T15:09:10.609Z',
    'text': 'test1'
  },
  {
    'created_at': '2016-04-25T15:09:10.609Z',
    'text': 'test2'
  }
]

describe('showTweets', () => {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    clock.setTimeout = (cb) => {cb()};
  });

  afterEach(() => {
    process.stdout.write.restore();
    nock.cleanAll();
    clock.restore();
  });

  it('test console log ', async () => {
    nock('https://api.twitter.com')
      .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
      .reply(200, mockTweets);
    const stdout = sinon.spy(process.stdout, 'write');
    const formatDate = sinon.stub();
    formatDate.withArgs(new Date('2017-04-30T15:09:10.609Z')).returns('15:09');
    formatDate.withArgs(new Date('2016-04-25T15:09:10.609Z')).returns('25 апреля 2016 в 15:09');
    const showTweets = proxyquire('../showTweets', {
      './formatDate': formatDate,
    });
    await showTweets();
    const stdoutRes = [
      '15:09\n',
      't',
      'e',
      's',
      't',
      '1',
      '\n',
      '25 апреля 2016 в 15:09\n',
      't',
      'e',
      's',
      't',
      '2',
      '\n',
    ]
    stdoutRes.forEach(el => {
      assert(stdout.calledWith(el));
    });
    assert(stdout.callCount, 14);
  });
});