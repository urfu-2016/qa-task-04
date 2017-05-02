'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const nock = require('nock');

const URL = require('url').URL;

const twitterUrl = new URL('https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016');

const mockTweets = [
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Oleg"
    },
    {
        "created_at": "2016-04-25T15:09:10.609Z",
        "text": "Mokhov"
    }
];

describe('showTweets tests', () => {
    const formatDate = sinon.stub();

    let expectedDate_1 = '25 апреля в 20:09';
    let expectedDate_2 = '25 апреля 2016 года 20:09';

    formatDate.withArgs(mockTweets[0].created_at).returns(expectedDate_1);  // TODO: Через год тест рухнет
    formatDate.withArgs(mockTweets[1].created_at).returns(expectedDate_2);

    const showTweets = proxyquire('../showTweets', {
        './formatDate': {
            formatDate: formatDate,
            months: []
        }
    });

    afterEach(() => {
        nock.cleanAll()
    });

    afterEach(() => {
        console.log.restore();
    });

    it('should return twits', async () => {
        nock(twitterUrl.origin)
            .get(`${twitterUrl.pathname}${twitterUrl.search}`)
            .reply(200, mockTweets);

        let parsedMockTweets = Object.assign({}, mockTweets);
        parsedMockTweets[0].created_at = expectedDate_1;
        parsedMockTweets[1].created_at = expectedDate_2;

        const log = sinon.stub(console, 'log');

        await showTweets();

        assert(log.calledTwice);
        assert(log.calledWith(`${parsedMockTweets[0].created_at}\n${parsedMockTweets[0].text}`));
        assert(log.calledWith(`${parsedMockTweets[1].created_at}\n${parsedMockTweets[1].text}`));
    });
});

describe('showTweets exception tests', () => {
    // TODO: Завтра, обещаю
});
