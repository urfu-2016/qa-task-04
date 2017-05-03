const assert = require('assert');
const showTweets = require('../showTweets');
const nock = require('nock');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

function nockGet() {
    return nock('https://api.twitter.com')
        .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
}

function nockReplyWith(statusCode, body) {
    nockGet().reply(statusCode, body);
}

function showTweetsErrorCB(done, expected) {
    return (error, actual) => {
        assert.equal(error, expected);
        done();
    }
}

describe('showTweets', () => {

    afterEach(nock.cleanAll);

    describe('Errors', () => {

        it(`should return 'Request error' on request error`, (done) => {
            nockGet().replyWithError('Replying with error');

            showTweets(showTweetsErrorCB(done, 'Request error'));
        });

        it(`should return 'Internal server error' on status code 500`, (done) => {
            nockReplyWith(500, 'Internal server error');

            showTweets(showTweetsErrorCB(done, 'Internal server error'));
        });

        it(`should return 'Parsing error' on not parseable string`, (done) => {
            nockReplyWith(200, 'This is not parseable string');

            showTweets(showTweetsErrorCB(done, 'Unexpected token T in JSON at position 0'));
        });
    });

    describe('with returned data', () => {
        let log;
        let err;

        beforeEach(() => {
            log = sinon.spy(console, 'log');
            err = sinon.spy(console, 'error');
        });

        afterEach(() => {
            console.log.restore();
            console.error.restore();
        });

        it(`should return tweets text with correct input`, (done) => {
            const reply = [
                {
                    "created_at": "2017-04-25T15:09:10.609Z",
                    "text": "текст твита"
                }
            ];
            const result = `
25 апреля в 20:09
текст твита
`;

            const formatDate = sinon.stub();
            formatDate.withArgs('2017-04-25T15:09:10.609Z').returns('25 апреля в 20:09');

            const showTweets = proxyquire('../showTweets', {
                './formatDate': formatDate
            });
            nockReplyWith(200, JSON.stringify(reply));

            showTweets((error, data) => {
                assert(!err.called);
                assert(log.called);
                assert(log.calledWith(result));
                done();
            });
        });

        it(`should throw error with wrong JSON format`, (done) => {
            const reply = [
                {
                    "created_at": "2017-04-25T15:09:10.609Z",
                    "txt": "текст твита"
                }
            ];

            const formatDate = sinon.stub();
            formatDate.withArgs('2017-04-25T15:09:10.609Z').returns('25 апреля в 20:09');

            const showTweets = proxyquire('../showTweets', {
                './formatDate': formatDate
            });
            nockReplyWith(200, JSON.stringify(reply));

            showTweets(showTweetsErrorCB(done, 'Каждый твит должен содержать поле text'));
        });
    });
});