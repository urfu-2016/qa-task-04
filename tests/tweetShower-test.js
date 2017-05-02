'use strict';

const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
chai.should();

const FAKE_TWEETS = [
    {
        created_at: '2015-06-25T15:15:00.609Z',
        text: 'tweet 1'
    },
    {
        created_at: '2015-06-25T15:15:00.609Z',
        text: 'tweet 2'
    }
];

describe('showTweets', () => {
    afterEach(() => {
        !console.log.restore || console.log.restore();
        !console.error.restore || console.error.restore();
    });

    it('should print to console tweets from twitter with formatted date', () => {
        const log = sinon.spy(console, 'log');
        const searchTweets = () => Promise.resolve(FAKE_TWEETS);
        const formatDate = () => '15:00';
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
            './formatDate': formatDate
        });
        const expectedText = '15:00\n' + 
                             'tweet 1\n' + 
                             '\n' +
                             '15:00\n' + 
                             'tweet 2';

        return tweetShower.showTweets().then(() => {
            log.calledWith(expectedText).should.be.true;
        });
    });

    it('should print `Failed to load tweets` if searchTweet rejected', () => {
        const error = sinon.spy(console, 'error');
        const searchTweets = () => Promise.reject();
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
        });

        return tweetShower.showTweets().then(() => {
            error.calledWith('Failed to load tweets').should.be.true;
        });
    });
});

describe('showTweetsTicker', () => {
    afterEach(() => {
        !console.log.restore || console.log.restore();
        !console.error.restore || console.error.restore();
    });
    
    it('should print tweets by words', () => {
        const log = sinon.spy(console, 'log');
        const searchTweets = () => Promise.resolve(FAKE_TWEETS);
        const formatDate = () => '15:00';
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
            './formatDate': formatDate
        });
        const expectedWords = ['15:00', 'tweet', '1', '', '15:00', 'tweet', '2'];

        return tweetShower.showTweetsTicker().then(() => {
            expectedWords.forEach(word => log.calledWith(word).should.be.true);
        });
    });

    it('should print `Failed to load tweets` if searchTweet rejected', () => {
        const error = sinon.spy(console, 'error');
        const searchTweets = () => Promise.reject();
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
        });

        return tweetShower.showTweetsTicker().then(() => {
            error.calledWith('Failed to load tweets').should.be.true;
        });
    })
});