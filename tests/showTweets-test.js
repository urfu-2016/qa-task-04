'use strict';

const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const proxyquire = require('proxyquire');
const showTweets = require('../showTweets');

const TWEETS = {
        statuses: [{
            'created_at': '2017-04-25T15:09:10.609Z',
            'text': 'Hello, world!'
        }]
};

describe('showTweets', () => {
        let log;
        let error;
        
        beforeEach(() => {
            log = sinon.spy(console, 'log');
            error = sinon.spy(console, 'error');
        });

        afterEach(() => {
            console.log.restore();
            console.error.restore();
            nock.cleanAll();
        });

        it('should print formatted tweet date and text', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, TWEETS);
            
            const expectedDate = () => '25 апреля в 20:09';
            const showTweets = proxyquire('../showTweets', {
                './formatDate': expectedDate
            });

            showTweets((_, result) => {
                assert(log.calledWith(result));
                assert(log.calledOnce);
                assert(!error.called);
                done();
            });
        });

        it('should return error when request failed', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError('Internal server error');
            
            showTweets((error, _) => {
                assert.equal(error, 'Internal server error');
                assert(!log.called);   
                done();
            });

        });

        it('should return `Request failed` when status code not 200', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(500, 'Internal server error');
            
            showTweets((error, _) => {
                assert.equal(error, 'Request failed');   
                assert(!log.called);
                done();
            });

        });

        it('should return `Parse error` when server response invalid JSON', done => {
            const invalidJSON = '{statuses: [,"ivallid_Data":01 ]}';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, invalidJSON);

            showTweets((error, _) => {
                assert.equal(error, 'Parse error');
                assert(!log.called);
                done();
            })
        });

        it('should not print anything when tweets list is empty', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, '{"statuses": []}');

            showTweets((error, _) => {
                assert(!log.called);
                assert(!error);
                done();
            })
        });
});