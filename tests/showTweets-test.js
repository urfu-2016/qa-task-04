const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const tweets = [
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Библиотека #nock forever!"
    },
    {
        "created_at": "2016-04-25T15:09:10.609Z",
        "text": "#proxyquire forever!"
    }
];
describe('showTweets', () => {
    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });
    describe('Positive tests', () => {

        it('display tweets on the console', done => {
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            const formatDate = sinon.stub();
            formatDate.withArgs(tweets[0].created_at).returns('вчера в 15:09');
			formatDate.withArgs(tweets[1].created_at).returns('25 мая 2016 года в 15:10');
            formatDate.throws('Illegal arguments');

            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, tweets);

            const showTweets = proxyquire('../showTweets', {
                './formatDate': formatDate
            });
			showTweets(() => {
                assert(log.calledTwice);

                assert(log.firstCall.calledWith('вчера в 15:09\n"Библиотека #nock forever!"'));
                assert(log.secondCall.calledWith('25 мая 2016 года в 15:10\n"#proxyquire forever!"'));
                assert(!error.called);

				done();
            });
        });
    });

    describe('Negative tests', () => {
        it('should throw error when nothing was returned', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, null);
            const showTweets = require('../showTweets');
            showTweets(() => {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });

        it('should throw error when parsing error by incorrect JSON', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.stub(console, 'error');
            const incorrectJSON = '[{"incorrect JSON key":"incorrect JSON value"}';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, incorrectJSON);
            const showTweets = require('../showTweets');
            showTweets(() => {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });

        it('should throw error when request error', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError('request error');
            const showTweets = require('../showTweets');
            showTweets(() => {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });
        it('should throw error when status code is not 200', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(300, '');
            const showTweets = require('../showTweets');
            showTweets(() => {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });
    });
});