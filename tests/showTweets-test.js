'use strict';

const nock = require('nock');
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const TWEETS = [
    {
        "created_at": "2017-04-25T15:09:10.609Z",
        "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
    },
    {
        "created_at": "2016-04-25T15:09:10.609Z",
        "text": "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"
    }
];

describe('showTweets', () => {
    it('should print tweets on console', () => {
        const consoleLog = sinon.stub(console, 'log');
        const formatDate = sinon.stub();
        const showTweets = proxyquire('../showTweets', {
            './formatDate': formatDate
        });

        const expected = `25 апреля в 15:09\n${TWEETS[0].text}\n25 апреля 2016 года в 15:09\n${TWEETS[1].text}`;

        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
            .reply(200, TWEETS);

        showTweets(() => {
            assert(consoleLog.calledWith(expected));
        });
    });


});