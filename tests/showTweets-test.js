'use strict';

const nock = require('nock');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

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
	var log;
	var error;
	afterEach(() => {
			console.log.restore();
			console.error.restore();
			nock.cleanAll();
	});
	
	beforeEach(() => {
		log = sinon.spy(console, 'log');
		error = sinon.spy(console, 'error');
	});
	
	it('should print the tweets to console', done => {
        const formatDate = sinon.stub();
        formatDate.withArgs(tweets[0].created_at).returns('вчера в 15:09');
        formatDate.withArgs(tweets[1].created_at).returns('25 мая 2016 года в 15:10');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);
        const expected = 'вчера в 15:09\n' + tweets[0].text + '\n25 мая 2016 года в 15:10\n' + tweets[1].text;
        showTweets(() => {
            assert(log.calledWith(expected));
            assert(log.calledOnce);
            assert(!error.called);
            done();
        });
    });
	
    it('should print the tweet to console, if json is not an array', done => {
        const formatDate = sinon.stub();
        formatDate.withArgs(tweets[0].created_at).returns('вчера в 15:09');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets[0]);
        const expected = 'вчера в 15:09\n' + tweets[0].text;

        showTweets(() => {
            assert(log.calledWith(expected));
            assert(log.calledOnce);
            assert(!error.called);
            done();
        });
    });
	
	it('should throw error for 404', done => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(404, 'Not found');
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
			assert(error.calledWith(404));
			done();
        });
    });
	
	it('should throw error for invalid json', done => {
		const json = 'invalid json';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, json);
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
			done();
        });
    });
	
	it('should throw error for reply with error', done => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError('error');
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
			done();
		});
	});
});
