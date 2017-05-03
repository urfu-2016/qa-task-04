'use strict';

const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const request = require('request');
const proxyquire =  require('proxyquire');
const showTweets = require('../showTweets');

const TWEETS = {
    statuses: [{
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Hello, world!"
    }]
};

describe('showTweets', () => {
    afterEach(() => {
            console.log.restore();
            console.error.restore();
            nock.cleanAll();
        });

        it('should print formatted tweet date and text', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.spy(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, TWEETS);
            
            const expectedDate = () => '25 апреля в 20:09';
            const showTweets = proxyquire('../showTweets', {
                './formatDate': expectedDate
            });
            

            showTweets.showTweets((_, result) => {
                assert(log.calledWith(result));
                assert(log.calledOnce);
                assert(!error.called);
                done();
            });
        });

        it('should return error when request failed', done => {
            const log = sinon.spy(console, 'log');
            const error = sinon.spy(console, 'error');
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError({'message': 'Internal server error', 'code': '500'});
            
            showTweets.showTweets((error, _) => {
                assert.equal(error, 'Internal server error');   
                done();
            });
    });
});