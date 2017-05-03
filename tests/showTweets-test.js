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
const tweets2 = [
	{
        "created_at": "2017-04-26T15:09:10.609Z",
        "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
    },
    {
        "created_at": "2017-03-25T15:09:10.609Z",
        "text": "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"
    }
];


describe('showTweets', () => {
	afterEach(() => {
			console.log.restore();
			console.error.restore();
			nock.cleanAll();
	});
	
    it('should print the tweets to console', () => {
        const log = sinon.spy(console, 'log');
		const error = sinon.spy(console, 'error');
		const formatDate = sinon.stub();
		formatDate.withArgs(tweets[0].created_at).returns('вчера в 15:09');
        formatDate.withArgs(tweets[1].created_at).returns('25 мая 2016 года в 15:10');
		const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);
        showTweets(() => {
			assert(log.calledTwice);
			assert(log.calledWith('вчера в 15:09\n' +
                    tweets[0]['text']));
            assert(log.calledWith('25 мая 2016 года в 15:10\n' + tweets[1]['text']));
            assert(!error.called);
        });
    });
	
	it('should print the tweets to console', () => {
        const log = sinon.spy(console, 'log');
		const error = sinon.spy(console, 'error');
		const formatDate = sinon.stub();
		formatDate.withArgs(tweets2[0].created_at).returns('15:09');
        formatDate.withArgs(tweets2[1].created_at).returns('25 апреля в 15:10');
		const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets2);
        showTweets(() => {
			assert(log.calledTwice);
			assert(log.calledWith('15:09\n' +
                    tweets2[0]['text']));
            assert(log.calledWith('25 апреля в 15:10\n' + tweets2[1]['text']));
            assert(!error.called);
        });
    });
	
	it('should throw error for 404', () => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(404, 'Not found');
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
			assert(error.calledWith(404));
        });
    });
	
	it('should throw error for invalid json', () => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');
		const json = 'invalid json';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, json);
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
        });
    });
	
	it('should throw error for reply with error', () => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError('error');
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
		});
	});
});
