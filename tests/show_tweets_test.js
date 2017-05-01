const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';
const tweets = [
  {
    "created_at": "2017-04-25T15:09:10.609Z",
    "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
  },
  {
    "created_at": "2016-04-25T15:09:10.609Z",
    "text": "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"
  }
];

describe('showTweets', () => {
  let log, error;

  beforeEach(() => {
    log = sinon.spy(console, 'log');
    error = sinon.spy(console, 'error');
  })

  afterEach(() => {
    console.log.restore();
    console.error.restore();
    nock.cleanAll();
  });

  describe('success request', () => {
    let dates, showTweets;

    beforeEach(() => {
      dates = ['вчера в 15:09', '25 мая 2016 года в 15:10']
      showTweets = proxyquire('../showTweets', {
        './formatDate': () => dates.shift()
      });
    })

    it('displays tweets on the console', done => {
      nock('https://api.twitter.com')
        .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
        .reply(200, tweets);

      showTweets(url, log, error)
      done()

      assert(error.calledOnce);
      assert(log.notCalled);
      assert(error.calledWith('вчера в 15:09\n' + '"' + tweets[0].text + '"' + '\n25 мая 2016 года в 15:10\n' + '"' + tweets[1].text + '"'));
    });

    it('fails json parse', done => {
      nock('https://api.twitter.com')
        .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
        .reply(200, 'bad json {[}]');

      showTweets(url, log, error)
      done()

      assert(error.calledOnce);
      assert(log.notCalled);
      assert(error.calledWith('parse JSON error'));
    })
  })

  it('fails request', done => {
    const showTweets = require('../showTweets');
    nock('https://api.twitter.com')
      .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
      .replyWithError('request error')

    showTweets(url, log, error)
    done()

    assert(log.calledOnce)
    assert(error.notCalled);
    assert(log.calledWith('request error'))
  })
})
