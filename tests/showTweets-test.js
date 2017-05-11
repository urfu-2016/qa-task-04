const assert = require('assert');
const sinon = require('sinon');
const nock = require('nock');
const proxyquire = require('proxyquire');
const url = '/1.1/search/tweets.json?q=%23urfu-testing-2016';
const tweet = [{
        created_at: '2017-05-03T13:55:10.000Z',
        text: 'сегодня'}];

describe('showTweets', () => {
    var log;
    var error;
    var formatDate;
    var showTweets;

    beforeEach(() => {
        log = sinon.stub(console, 'log');
        error = sinon.stub(console, 'error');
        formatDate = sinon.stub();
        showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
    });

    afterEach(() => {
        nock.cleanAll();
        console.log.restore();
        console.error.restore();
    });

    it('should print today`s tweet to the console', () => {
        nock('https://api.twitter.com/')
            .get(url)
            .reply(200, tweet);
        formatDate.withArgs(tweet[0].created_at).returns('13:55');
        
        showTweets(() => {
            assert(log.calledWith('13:55\n${tweet[0].text}'));
        });
    })

    it('should print error if json is incorrect', () => {
        nock('https://api.twitter.com')
            .get(url)
            .reply(200, 'invalidJSON');

        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
        });
    });

    it('should print error if statusCode is not 200', () => {
        nock('https://api.twitter.com')
            .get(url)
            .reply(404, tweet);

        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
        });
    });

    it('should print error if request error', () => {
        nock('https://api.twitter.com')
            .get(url)
            .replyWithError('request error');

        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
        });
    });
});