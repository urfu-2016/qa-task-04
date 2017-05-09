'use strict';

const assert = require('assert');
const nock = require('nock');
const sinon = require('sinon');
const proxyQuire = require('proxyquire');

describe('showTweets', () => {
    let log = null;

    before(() => {
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json')
            .query({ q: '#urfu-testing-2016' })
            .reply(200, [
                {
                    "created_at": "2017-04-25T15:09:10.609Z",
                    "text": "text1"
                },
                {
                    "created_at": "2016-04-25T15:09:10.609Z",
                    "text": "text2"
                }
            ]);

        log = sinon.spy(console, 'log');
    });

    it('should load and log tweets', async () => {
        const formatDateStub = sinon.stub();

        formatDateStub.withArgs('2017-04-25T15:09:10.609Z')
            .returns('25 апреля в 15:09');
        formatDateStub.withArgs('2016-04-25T15:09:10.609Z')
            .returns('25 апреля 2016 года в 15:09');

        const showTweets = proxyQuire('../showTweets', {
            './formatDate': formatDateStub
        });

        const expected = [
            '25 апреля в 15:09\n"text1"',
            '25 апреля 2016 года в 15:09\n"text2"'
        ];

        await showTweets();

        assert.equal(log.callCount, expected.length);

        for (const [index, expectedString] of expected.entries()) {
            assert(log.getCall(index).calledWith(expectedString));
        }
    });

    after(() => {
        nock.cleanAll();
        log.restore();
    });
});
