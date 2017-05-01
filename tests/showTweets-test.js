'use strict';

const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
chai.should();

describe('showTweets', () => {
    afterEach(() => {
        !console.log.restore || console.log.restore();
        !console.error.restore || console.error.restore();
    });

    const fakeTweets = [
        {
            created_at: '2015-06-25T15:15:00.609Z',
            text: 'tweet 1'
        },
        {
            created_at: '2015-06-25T15:15:00.609Z',
            text: 'tweet 2'
        }
    ];

    it('should print to console tweets from twitter with formatted date', () => {
        const log = sinon.spy(console, 'log');
        const searchTweets = () => Promise.resolve(fakeTweets);
        const formatDate = () => '15:00';
        const showTweets = proxyquire('../app/showTweets', {
            './twitterApi': { searchTweets: searchTweets },
            './formatDate': formatDate
        });
        const expectedText = '15:00\n' + 
                             'tweet 1\n' + 
                             '\n' +
                             '15:00\n' + 
                             'tweet 2';

        return showTweets().then(() => {
            log.calledWith(expectedText).should.be.true;
        });
    });

    it('should print `Failed to load tweets` if searchTweet rejected', () => {
        const error = sinon.spy(console, 'error');
        const searchTweets = () => Promise.reject();
        const showTweets = proxyquire('../app/showTweets', {
            './twitterApi': { searchTweets: searchTweets },
        });

        return showTweets().then(() => {
            error.calledWith('Failed to load tweets').should.be.true;
        });
    });
});