const api = require('../app/twitterApi');
const nock = require('nock');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const errors = require('request-promise/errors');

describe('searchTweets', () => {
    after(nock.restore);
    afterEach(nock.cleanAll);

    it('should be rejected with StatusCodeError when send invalid token', () => {
        const query = 'some';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q='+query)
            .reply(401);

        return api.searchTweets(query, 'invalid token')
                  .should.be.rejectedWith(errors.StatusCodeError);
    });

    it('should be rejected with RequestError when twitter does not reply', () => {
        const query = 'some';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q='+query)
            .replyWithError('Problem with internet connection');

        return api.searchTweets(query, 'token')
                  .should.be.rejectedWith(errors.RequestError);
    });

    it('should be rejected with SyntaxError when twitter send incorrect JSON', () => {
        const query = 'some';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q='+query)
            .reply(200, 'incorrect JSON');

        return api.searchTweets(query, 'token')
                  .should.be.rejectedWith(SyntaxError);
    });

    it('should be rejected with SyntaxError when twitter send JSON without field "statuses"', () => {
        const query = 'some';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q='+query)
            .reply(200, '{"this JSON has not field `statuses`":""}');

        return api.searchTweets(query, 'token')
                  .should.be.rejectedWith(SyntaxError, 'Incorrect JSON without field `statuses`');
    });

    it('should return all data from reply JSON "statuses" field', () => {
        const query = 'some';
        const statuses = '[{"text": "some tweet 1"}, {"text": "some tweet 2"}]';
        nock('https://api.twitter.com')
            .get('/1.1/search/tweets.json?q='+query)
            .reply(200, `{"statuses": ${statuses}}`);

        return api.searchTweets(query, 'token')
                  .should.become(JSON.parse(statuses));
    });
});