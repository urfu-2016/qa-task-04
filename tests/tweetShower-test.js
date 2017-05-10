'use strict';

const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
//const lolex = require('lolex');
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

describe('show', () => {
    afterEach(() => {
        console.log.restore && console.log.restore();
        console.error.restore && console.error.restore();
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

        return tweetShower.show().then(() => {
            log.calledWith(expectedText).should.be.true;
        });
    });

    it('should print `Failed to load tweets` if searchTweet rejected', () => {
        const error = sinon.spy(console, 'error');
        const searchTweets = () => Promise.reject();
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
        });

        return tweetShower.show().then(() => {
            error.calledWith('Failed to load tweets').should.be.true;
        });
    });
});

describe('showCharByChar', () => {
    afterEach(() => {
        console.log.restore && console.log.restore();
        console.error.restore && console.error.restore();
    });

    it('should print tweets char by char', () => {
        const stdoutWrite = sinon.spy(process.stdout, 'write');
        const searchTweets = () => Promise.resolve(FAKE_TWEETS);
        const formatDate = () => '15:00';
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
            './formatDate': formatDate
        });

        const expectedChars = '15:00\ntweet 1\n\n15:00\ntweet 2'.split('');

        return tweetShower.showCharByChar(0).then(() => {
            expectedChars.forEach(char => stdoutWrite.calledWith(char).should.be.true);
            //stdoutWrite.callCount.should.be.equal(expectedChars.length);
        });
    });

    it('should print `Failed to load tweets` if searchTweet rejected', () => {
        const error = sinon.spy(console, 'error');
        const searchTweets = () => Promise.reject();
        const tweetShower = proxyquire('../app/tweetShower', {
            './twitterApi': { searchTweets: searchTweets },
        });

        return tweetShower.showCharByChar().then(() => {
            error.calledWith('Failed to load tweets').should.be.true;
        });
    });
});