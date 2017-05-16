'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const nock = require('nock');
const sinon = require('sinon');

const URL = '/1.1/search/tweets.json?q=%23urfu-testing-2016';

const tweets = [
    {
        'created_at': '2017-05-3T15:09:10.609Z',
        'text': 'Some text 1'
    },
    {
        'created_at': '2016-05-4T15:09:10.609Z',
        'text': 'Some text 2'
    }
];


describe('showTweets', ()=> {
    const formatDate = sinon.stub();

    afterEach(() => {
        console.log.restore();
        nock.cleanAll();
    });

    var expected =['вчера в 20:09', '4 мая 2016 года в 20:09'];

    formatDate.withArgs(tweets[0].created_at).returns(expected[0]);
    formatDate.withArgs(tweets[1].created_at).returns(expected[1]);

    it('должен вывести на консоль дату и текст твита', done => {
        const log = sinon.spy(console, 'log');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);

        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        showTweets(() => {
            assert.equal(log.callCount, 4);
            assert.equal(log.firstCall.args[0], 'вчера в 20:09');
            assert.equal(log.secondCall.args[0], 'Some text 1');
            assert.equal(log.thirdCall.args[0], '4 мая 2016 года в 20:09');
            assert.equal(log.getCall(3).args[0], 'Some text 2');
            done();
        });
    });

    it('должен выводить `Request failed`, когда код ответа не 200', done => {
        const log = sinon.spy(console, 'log');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(404, 'Not Found');

        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        showTweets((error, result) => {
            assert.equal(error, 'Request failed');
            assert(log.notCalled);
            done();
        });
    });

    it('должен выводить `Request failed`, когда не корректный JSON', done => {
        const log = sinon.spy(console, 'log');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, 'lalala');

        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        showTweets((error, result) => {
            assert.equal(error, 'Parse error');
            assert(log.notCalled);
            done();
        });
    });

    it('не должен выводить ничего, когда нет твитов', done => {
        const log = sinon.spy(console, 'log');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, []);

        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        showTweets((error, result) => {
            assert.equal(error, null);
            assert(log.notCalled);
            done();
        });
    });
});