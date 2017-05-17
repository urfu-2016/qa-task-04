const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const showTweets = require('../showTweets');
        
const HOST = 'https://api.twitter.com';
const URL = '/1.1/search/tweets.json?q=%23urfu-testing-2016';

describe('showTweets', () => {
    var log;

    beforeEach(() => {
        log = sinon.spy(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
        nock.cleanAll();
    });
    
    context('when response is valid and no request error', () => {
        const obj = {
            created_at: 'date',
            text: 'text'
        };
        
        const formatedDate = 'Formated date';
        const formatDate = sinon.stub();
        formatDate.withArgs(obj.created_at).returns(formatedDate);
        
        const showTweetsWithProxyquire = proxyquire('../showTweets', {
            './formatDate': formatDate
        }); 
        
        beforeEach(() => {
            nock(HOST)
                .get(URL)
                .reply(200, JSON.stringify([obj]));
        });

        it('should call callback without error', done => {
            showTweetsWithProxyquire(error => {
                assert.equal(error, undefined);
                done();
            });
        });
    
        it('should call twice console.log', done => {
            showTweetsWithProxyquire(error => {
                assert(log.calledTwice);
                assert(log.withArgs(formatedDate).calledOnce);
                assert(log.withArgs(obj.text).calledOnce);
                done();
            });
        }); 
    });

    context('when request error', () => {
        const errorMessage = 'Request Error';

        beforeEach(() => {
            nock(HOST)
                .get(URL)
                .replyWithError(errorMessage);
        });

        it('shouldn\'t call consol.log', done => {
            showTweets(error => {
                assert(log.notCalled);
                done();
            });
        });

        it('should call callback with error', done => {
            showTweets(error => {
                assert.equal(error.message, errorMessage);
                done();
            });
        });      
    });
    
    context('when parse error', () => {
        it('should call callback with SyntaxError when response body is not JSON', done => {
            nock(HOST)
                .get(URL)
                .reply(200, 'JSON');
                
            showTweets(error => {
                assert(error instanceof SyntaxError);
                done();
            });
        });
    
        it('should call calcback with error when data in pesponse body is not array', done => {
            nock(HOST)
                .get(URL)
                .reply(200, JSON.stringify({}));

            showTweets(error => {
                assert.equal(error.message, 'Data in response body is not array');
                done();
            });
        });
        
        it('shoudn\'t call consol.log when parse error is', done => {
            nock(HOST)
                .get(URL)
                .reply(200, 'JSON');
                
            showTweets(error => {
                assert(log.notCalled);
                done();
            });
        });
    });
});
