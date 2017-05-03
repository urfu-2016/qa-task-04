const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const nock = require('nock');

//const showTweets = require('../showTweets');

const twUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

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


describe('showTweets tests', () =>{

    afterEach(() => {
        console.log.restore();
        console.error.restore();
    });


    nock('https://api.twitter.com')
        .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
        .reply(200, tweets)


    it('should print tweets', () =>{
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        const formatDate = sinon.stub();

        formatDate.withArgs(tweets[0].createdAt).returns(expDates[0]);
        formatDate.withArgs(tweets[1].createdAt).returns(expDates[1]);


        const showTweets = proxyquire('../showTweets', {
            './formatDate' : formatDate
        });

        showTweets(() =>{
            assert(log.calledTwice);
            assert(log.calledWith(expDates[0] + '\n' + tweets[0].text));
            assert(log.calledWith(expDates[1] + '\n' + tweets[1].text));
            assert(!error.called);
        });

    });
    
    /*const showTweets = proxyquire('../showTweets', {
        './formatDate' : (date) => new Date(date)
    });*/

    

});

