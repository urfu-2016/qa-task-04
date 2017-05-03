'use strict';

const nock = require('nock');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const TWEETS = [
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
    let consoleLog;
    let consoleError;
    let formatDate;
    let showTweets;

    beforeEach(() => {
        consoleLog = sinon.spy(console, 'log');
        consoleError = sinon.spy(console, 'error');
        formatDate = sinon.stub();
        showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
    });

    it('should print tweets on console', () => {
        const expected = `25 апреля в 15:09\n${TWEETS[0].text}\n25 апреля 2016 года в 15:09\n${TWEETS[1].text}`;
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, TWEETS);

        showTweets(() => {
            assert(consoleLog.calledWith(expected));
        });
    });

    it('should print error on console if json is incorrect', () => {
        const invalidJSON = 'invalidJSON';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, invalidJSON);

        showTweets(() => {
            assert(!consoleLog.called);
            assert(consoleError.calledOnce);
        });
    });

    it('should print error on console if statusCode is not 200', () => {
        let code = 404;
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(code, TWEETS);

        showTweets(() => {
            assert(!consoleLog.called);
            assert(consoleError.calledOnce);
            assert(consoleError.calledWith(code));
        });
    });

    it('should print error on console if request error', () => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError('request error');

        showTweets(() => {
            assert(!consoleLog.called);
            assert(consoleError.calledOnce);
        });
    });

    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });
});