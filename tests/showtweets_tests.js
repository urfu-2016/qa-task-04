const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const nock = require('nock');

const tweetMessages =
[
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Чуть короче^^"
    },
    {
        "created_at": "2016-04-25T15:09:10.609Z",
        "text": "Hello, world!"
    }
]


describe('showTweets', () =>
{
	afterEach(() =>
	{
		nock.cleanAll();
		console.log.restore();
		console.error.restore();
	});
	
	describe('Positive tests', () =>
	{
		it('Должен выводить твиты на консоль', done =>
		{
			const log = sinon.stub(console, 'log');
			const error = sinon.stub(console, 'error');
			nock ('https://api.twitter.com')
			.get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
			.reply(200, tweetMessages);
			const formatDate = sinon.stub();
			formatDate.withArgs(tweetMessages[0].created_at).returns('25 апрель в 15:09');
			formatDate.withArgs(tweetMessages[1].created_at).returns('25 марта 2016 года в 15:09');
			formatDate.throws('Invalid arguments');
			const showTweets = proxyquire('../showTweets', {
				'./formatDate': formatDate});
			showTweets(() =>
            {
                assert(log.calledWith('25 апрель в 15:09'));
                assert(log.calledWith('Чуть короче^^'));
                assert(log.calledWith('25 марта 2016 года в 15:09'));
                assert(log.calledWith('Hello, world!'));
                assert(!error.called);
                done();
            });
		});
	});
	describe('Negative tests', () => 
	{
		it('Должен выбросить ошибку, если код ответа != 200', done =>
		{
			const log = sinon.stub(console, 'log');
			const error = sinon.stub(console, 'error');
			nock ('https://api.twitter.com')
			.get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
			.reply(500, 'Internal server error');
			const showTweets = require('../showTweets');
			showTweets(() =>
			{
				assert(!log.called);
				assert(error.calledOnce);
				done();
			});
		});
		it('Должен выбросить ошибку, если вернется невалидный твит', done =>
		{
			const log = sinon.stub(console, 'log');
			const error = sinon.stub(console, 'error');
			const InvalidBody = 'Мусор всякий невалидный';
			nock ('https://api.twitter.com')
			.get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
			.reply(200, InvalidBody);
			const showTweets = require('../showTweets');
			showTweets(() =>
			{
				assert(!log.called);
				assert(error.calledOnce);
				done();
			});
		});
		it('Должен выбросить ошибку, если запрос был с ошибкой', done =>
		{
			const log = sinon.stub(console, 'log');
			const error = sinon.stub(console, 'error');
			nock ('https://api.twitter.com')
			.get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
			.replyWithError('Ошибку здесь видишь ты');
			const showTweets = require('../showTweets');
			showTweets(() =>
			{
				assert(!log.called);
				assert(error.calledOnce);
				done();
			});
		});
		
	});
})