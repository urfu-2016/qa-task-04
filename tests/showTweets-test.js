const assert = require('assert');
const sinon = require('sinon');
const nock = require('nock');
const proxyquire = require('proxyquire');

describe('showTweets', () => {
    afterEach(() => {
        console.log.restore();
        console.error.restore();
    });
    const tweet = [
        {
            created_at: '2017-05-03T13:55:10.000Z',
            text: 'сегодня'},
        {
            created_at: '2017-05-02T13:55:10.000Z',
            text: 'вчера в 13:55'},
        {
            created_at: '2016-05-02T13:55:10.000Z',
            text: '2 мая 2016 года в 13:55'},
        {
            created_at: 'Illegal arguments',
            text: 'Переданный аргумент не формата Date'},
        {
            text: 'Неверное число аргументов'},
        {
            created_at: '2018-05-02T13:55:10.000Z',
            text: 'Дата должна быть до текущей даты'
        }];

    it('should print today`s tweet to the console', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(tweet[0].created_at)).returns('13:55');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith('13:55'));
                assert(log.calledWith(tweet[0].text))
                });
    })

    it('should print yesterday`s tweet to the console', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(tweet[1].created_at)).returns(tweet[1].text);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith(tweet[1].text));
                assert(log.calledWith(tweet[1].text))
        });
    })

    it('should print last year`s tweet to the console', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(tweet[2].created_at)).returns(tweet[2].text);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith(tweet[2].text));
                assert(log.calledWith(tweet[2].text))
        });
    })

    it('should return an invalid date format error', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(tweet[3].created_at)).returns(tweet[3].text);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith(tweet[3].text));
        });
    });

    it('should return error number of arguments', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(), 2).returns(tweet[4].text);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith(tweet[4].text));
        });
    });
    it('should return error number of arguments', () => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweet);
        const formatDate = sinon.stub();
        formatDate.withArgs(new Date(tweet[5].created_at)).returns(tweet[5].text);
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        return showTweets()
                .then(() => {
                assert(log.calledWith(tweet[5].text));
        });
    });
});