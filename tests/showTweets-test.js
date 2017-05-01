const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

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
    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
        // clock.restore();
    });
    describe('good data', () => {

        it('display tweets on the console', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.spy(console, 'error');
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

                assert(log.calledWith('вчера в 15:09\n' +
                    '"Библиотека #nock позволяет не только удобно писать тесты, ' +
                    'но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! ' +
                    '#urfu-testing-2016"'));
                assert(log.calledWith('25 мая 2016 года в 15:10\n"Для подмены модулей раньше я использовал #mockery, ' +
                    'а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"'));
                assert(!error.called);

                done();
            });
        });
    });

    describe('bad data', () => {
        it('should throw error when nothing was returned', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.spy(console, 'error');
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

        it('should throw error when parsing error', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.spy(console, 'error');
            const incorrectJSON = '[{"parsing error":"PARSING ERROR"}';
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
            const error = sinon.spy(console, 'error');
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
            const log = sinon.stub(console, 'log');
            const error = sinon.stub(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(502, '');
            const showTweets = require('../showTweets');
            showTweets(() => {
                assert(!log.called);
                assert(error.calledOnce);
                done();
            });
        });
    });
});
