const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const request = require('request');
const proxyquire =  require('proxyquire');
const showTweets = require('../showTweets');

const TWEETS = {
    statuses: [{
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Привет"
    }]
};

describe('showTweets', () => {
    afterEach(() => {
        console.log.restore();
        nock.cleanAll();
    });

    it('should print formatted tweet date and text to console', () => {
        const log = sinon.spy(console, 'log');

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, TWEETS);
        
        showTweets.showTweets(() => {
            assert(log.calledOnce);
        });
    });
});