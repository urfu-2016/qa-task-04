const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const nock = require('nock');


const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';


describe('showTweets tests', () =>{

    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });


    it('should print tweets', done =>{

        var tweets = [
            {
                "createdAt":"2017-05-03T10:09:00.333Z",
                "text": "Hello, world!"
            },
            {
                "createdAt": "1999-01-11T03:02:01.000Z",
                "text": "Hellow, me!"
            }
        ];

        var expDates = ['10:09', '11 января 1999 года в 03:02']

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets)


        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        const formatDate = sinon.stub();

        formatDate.withArgs(tweets[0].createdAt).returns(expDates[0]);
        formatDate.withArgs(tweets[1].createdAt).returns(expDates[1]);


        const showTweets = proxyquire('../showTweets', {
            './formatDate' : formatDate
        });

        showTweets(() => {
            assert(log.calledOnce);
            assert(log.calledWith(expDates[0] + '\n' + tweets[0].text));
            //assert(log.calledWith(expDates[1] + '\n' + tweets[1].text));
            assert(!error.called);
            done();
        });


    });

    
    
    it('should print error message from request', done => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .replyWithError({code: 303, error: "fuck you"});

        var formatDateShadow = sinon.stub();

        const showTweets = proxyquire('../showTweets', {
            './formatDate' : { formatDate : formatDateShadow}
        });

        showTweets(() => {

            assert(!log.called);
            assert(error.called);
            //assert(error.calledWith('Having fun! Do not disturb!!!'));
            done();
        });
    });


    it('should print status code different from 200', done => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(309, 0)

        var formatDateShadow = sinon.stub();

        const showTweets = proxyquire('../showTweets', {
            './formatDate' : formatDateShadow
        });

        showTweets(() => {
            assert(log.calledOnce);
            //assert(log.calledWithMatch('statusCode: 309'));
            assert(!error.called);
            done();
        });
    });


    it('should throw error on parsing', done => {
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, '1mku.,liu234')

        var formatDateShadow = sinon.stub();

        const showTweets = proxyquire('../showTweets', {
            './formatDate' : formatDateShadow
        });

        showTweets(() => {
            assert(!log.called);
            //assert(log.calledWith('statusCode: 308'));
            assert(error.calledOnce);
            done();
        });
    });

});