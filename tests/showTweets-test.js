const nock = require('nock');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('assert');

const messages =
    [
        {
            "created_at": "2017-04-25T15:09:10.609Z",
            "text": "Some text for the test"
        },
        {
            "created_at": "2016-04-25T15:09:10.609Z",
            "text": "Какой-то текст для теста"
        }
    ];

describe('showTweets', () =>
{
    afterEach(() =>
    {
        nock.cleanAll();
        console.log.restore();
        console.error.restore();
    });

    describe('Valid data', () =>
    {
        it('Should output messages to the console', done =>
        {
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, messages);
            const formatDate = sinon.stub();
            formatDate.withArgs(messages[0].created_at).returns('25 мая в 15:09');
            formatDate.withArgs(messages[1].created_at).returns('25 мая 2016 года в 15:09');
            formatDate.throws('Illegal arguments');
            const showTweets = proxyquire('../showTweets', {'./formatDate': formatDate});
            showTweets(() =>
            {
                assert(log.calledWith('25 мая в 15:09'));
                assert(log.calledWith('Some text for the test'));
                assert(log.calledWith('25 мая 2016 года в 15:09'));
                assert(log.calledWith('Какой-то текст для теста'));
                assert(!error.called);
                done();
            });
        });
    });

    describe('Invalid data', () =>
    {
        it('Should throw error when status code is not 200', done =>
        {
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(500, '');
            const showTweets = require('../showTweets');
            showTweets(() =>
            {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });

        it('Should throw error when a request error occurred', done =>
        {
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError('Something is wrong');
            const showTweets = require('../showTweets');
            showTweets(() =>
            {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });

        it('Should throw error when messages are invalid', done =>
        {
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            const invalidData = '{]{"inv`alid":::"data"})';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, invalidData);
            const showTweets = require('../showTweets');
            showTweets(() =>
            {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });
    });
});
