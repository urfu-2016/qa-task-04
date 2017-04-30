'use strict';

const assert = require('assert');
const sinon = require('sinon');
const nock = require('nock');
const proxyquire = require('proxyquire');

describe('showTweets', () => {
    it('should receive tweets array and output it to console', done => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        const tweets = [{
            created_at: 'First of May',
            text: 'some text'
        }];
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, tweets);
        const formatDate = sinon.stub();
        formatDate
            .withArgs(tweets[0].created_at)
            .returns(tweets[0].created_at);
        formatDate.throws('Illegal arguments');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        showTweets(() => {
            assert(log.calledTwice);
            assert(log.calledWith(tweets[0].created_at));
            assert(log.calledWith(tweets[0].text));
            assert(!error.called);
            done();
        });
    });

    it('should throw error when there is no data', done => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, null);
        const formatDate = sinon.stub();
        formatDate
            .withArgs(null)
            .returns(null);
        formatDate.throws('Illegal arguments');
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
            done();
        });
    });

    it('should throw error in case of parsing error', done => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        const incorrectJSON = '[{"incorrect":"JSON"}';
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

    // it('should throw error in case of request error', done => {
    //     // TODO
    // });

    it('should throw error when status code is not 200', done => {
        const log = sinon.stub(console, 'log');
        const error = sinon.stub(console, 'error');
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(404, '');
        const showTweets = require('../showTweets');
        showTweets(() => {
            assert(!log.called);
            assert(error.calledOnce);
            done();
        });
    });

    afterEach(() => {
        console.log.restore();
        console.error.restore();
        nock.cleanAll();
    });
});
