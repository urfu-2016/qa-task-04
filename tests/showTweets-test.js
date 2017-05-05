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

        it('should show formatted tweet date and text', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, TWEETS);
            
            const expectedDate = () => '25 апреля в 20:09';
            const showTweets = proxyquire('../showTweets', {
                './formatDate': expectedDate
            });

            showTweets(() => {
                assert(log.calledWith('25 апреля в 20:09\nHello, world!'));
                assert(log.calledOnce);
                assert(!error.called);
                done();
            });
        });

        it('should show `Request failed` when server reply with error', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError('Internal server error');
            
            showTweets(() => {
                assert(error.calledWith('Request failed'));
                assert(error.calledOnce);
                assert(!log.called);   
                done();
            });

        });

        it('should show `Request failed` when status code not 200', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(500, 'Internal server error');
            
            showTweets(() => {
                assert(error.calledWith('Request failed'))  
                assert(error.calledOnce); 
                assert(!log.called);
                done();
            });

        });

        it('should show `Could not parse tweets` when server response invalid JSON', done => {
            const invalidJSON = '{statuses: [,"ivallid_Data":01 ]}';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, invalidJSON);

            showTweets(() => {
                assert(error.calledWith('Could not parse tweets'));
                assert(error.calledOnce);
                assert(!log.called);
                done();
            })
        });

        it('should not show anything when tweets list is empty', done => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, '{"statuses": []}');

            showTweets(() => {
                assert(!log.called);
                assert(!error.called);
                done();
            })
        });

        it('should not show tweets, parsed as `null`', done => {
            const responseWithNull = '{"statuses": [null, null, null]}';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, responseWithNull);

            showTweets(() => {
                assert(!log.called);
                assert(!error.called);
                done();
            })
        });

        it('should not show tweets with created_at or text equal to `null`', done => {
            const responseWithNull = '{"statuses": [{"created_at": null, "text": null}]}';
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, responseWithNull);

            showTweets(() => {
                assert(!log.called);
                assert(!error.called);
                done();
            })
        });
});
