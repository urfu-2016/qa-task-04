const showTweets = require('../showTweets');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const tweets = [
    {
        'created_at': '2017-04-25T15:09:10.609Z',
        'text': 'Библиотека #nock позволяет не только удобно писать тесты'
    },
    {
        'created_at': '2016-04-25T15:09:10.609Z',
        'text': 'Для подмены модулей раньше я использовал #mockery'
    }
];

describe('showTweets testing', () => {
    beforeEach(() => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');
    });

    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });

    it('should print all tweets', done => {
        const tweetDates = ['вчера в 15:09', '25 мая 2016 года в 15:10'];
        const showTweets = proxyquire('../showTweets', {
            './formatDate': () => tweetDates.shift()
        });

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);

        showTweets();
        done();

        assert(error.calledOnce);
        assert(log.notCalled);
    });

    it('unable to parse json', done => {
        const tweetDates = ['вчера в 15:09', '25 мая 2016 года в 15:10'];
        const showTweets = proxyquire('../showTweets', {
            './formatDate': () => tweetDates.shift()
        });

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, 'bad json {[}]');

        showTweets();
        done();

        assert(error.calledOnce);
        assert(log.notCalled);
    });

    it('request issues', done => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError('request error');

        showTweets();
        done();

        assert(error.calledOnce);
        assert(log.notCalled);
    });
});
