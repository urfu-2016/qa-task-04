'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');
const assert = require('assert');
const EXAMPLE_TWEETS = [
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Hi there!"
    }
];


describe('showTweets', () => {
    afterEach(() => {
        console.log.restore();
        console.error.restore();
    });

    it('should print to console tweets', () => {
        nock('https://api.twitter.com/')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, EXAMPLE_TWEETS);
        const formatDate = sinon.stub();
        formatDate.withArgs("2017-04-25T15:09:10.609Z").returns('25 апреля 15:09');

        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        const log = sinon.spy(console, 'log');
        const error = sinon.spy(console, 'error');

        return showTweets()
            .then(() => {
                assert(log.calledWith('25 апреля 15:09'));
                assert(log.calledWith('Hi there!'))
            });
    });

});