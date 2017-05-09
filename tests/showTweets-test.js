const assert = require('assert');
const proxyquire = require('proxyquire');
const nock = require('nock');
const sinon = require('sinon');

const tweets = [
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Text 1"
    },
    {
        "created_at": "2016-04-25T15:09:10.609Z",
        "text": "Text 2"
    }
];

describe('showTweets', () => {
    var log, error;
    const formatDate = sinon.stub();

    beforeEach(() => {
        log = sinon.spy(console, 'log');
        error = sinon.spy(console, 'error');
    });
    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });

    it('should print error message when code is not 200', () => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(400, 'Bad Request');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        showTweets(() => {
            assert(error.calledWith(400));
            assert(!log.called);
        });
    });

    it('should print error message for failed request', () => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError('Bad Request');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        showTweets(() => {
            assert(error.calledWith('Bad Request'));
            assert(!log.called);
        });
    });

    it('should print error message for json without "created_at" and "text" fields', () => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, [{"field":""}]);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        showTweets(() => {
            assert(error.calledOnce);
            assert(!log.called);
        });
    });

    it('should print dates and texts of all tweets', () => {
        formatDate.withArgs(tweets[0].created_at).returns('25 апреля в 20:09');
        formatDate.withArgs(tweets[1].created_at).returns('25 апреля 2016 в 20:09');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);
        showTweets(() => {
            assert(log.calledWith('25 апреля в 20:09'));
            assert(log.calledWith('Text 1'));
            assert(log.calledWith('25 апреля 2016 в 20:09'));
            assert(log.calledWith('Text 2'));
            assert(!error.called);
        });
    });
});