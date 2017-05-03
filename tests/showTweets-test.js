const assert = require('assert');
const sinon = require('sinon');
const nock = require('nock');
const proxyquire = require('proxyquire');
const showTweets = require('../showTweets');

describe('showTweets', () => {

    const twitterUrl = 'https://api.twitter.com';
    const twitterGetQuery = '/1.1/search/tweets.json?q=%23urfu-testing-2016';

    const testTweets = [
        {"created_at": "2017-04-25T15:09:10.609Z", "text": "Твит"},
        {"created_at": "2016-04-25T15:09:10.609Z", "text": "Tweet"}];

    afterEach(() => {
        nock.cleanAll();
    });

    describe('Positive test', () => {
        let clock;

        afterEach(() => {
            process.stdout.write.restore();
            clock.restore();
        });

        it('should print tweets to console', async() => {
            clock = sinon.useFakeTimers();
            clock.setTimeout = (cb) => {
                clock.tick(100);
                cb();
            };

            const expectedPrint = ['1', '5', ':', '0', '9', '\n', 'Т', 'в', 'и', 'т', '\n', '\n', '2', '5', ' ',
                'а', 'п', 'р', 'е', 'л', 'я', ' ', '2', '0', '1', '6', ' ', 'г', 'о', 'д', 'а', ' ', 'в', ' ',
                '1', '5', ':', '0', '9', '\n', 'T', 'w', 'e', 'e', 't', '\n', '\n'];

            nock(twitterUrl).get(twitterGetQuery)
                .reply(200, testTweets);

            const stdout = sinon.spy(process.stdout, 'write');

            const formatDate = sinon.stub();
            formatDate.withArgs('2017-04-25T15:09:10.609Z').returns('15:09');
            formatDate.withArgs('2016-04-25T15:09:10.609Z').returns('25 апреля 2016 года в 15:09');

            const showTweets = proxyquire('../showTweets', {'./formatDate': formatDate});

            try {
                await showTweets();

                for (let symbol of expectedPrint) {
                    assert(stdout.calledWith(symbol));
                }
                assert.equal(stdout.callCount, expectedPrint.length);
            } catch (error) {
                assert.ok(false);
            }
        });
    });

    describe('Negative test', () => {

        it('should throw Error if showTweets call with arguments', async() => {
            try {
                await showTweets('argument');
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Функция showTweets не принимает аргументы");
            }
        });

        it('should throw Error if request error', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .replyWithError('Error');
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Запрос к серверу не удался или сервер вернул код ошибки отличный от 2хх");
            }
        });

        it('should throw Error if status codes other than 2xx', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .reply(404, testTweets);
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Запрос к серверу не удался или сервер вернул код ошибки отличный от 2хх");
            }
        });

        it('should throw Error if response not JSON', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .reply(200, 'не JSON');
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Сервер вернул не JSON");
            }
        });

        it('should throw Error if response not Object', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .reply(200, 1);
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Сервер вернул не объект");
            }
        });

        it('should throw Error if response tweets hasn`t property created_at', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .reply(200, [{"text": "test"}]);
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Сервер вернул объект без свойства created_at");
            }
        });

        it('should throw Error if response tweets hasn`t property text', async() => {
            nock(twitterUrl).get(twitterGetQuery)
                .reply(200, [{"created_at": "2017-04-25T15:09:10.609Z"}]);
            try {
                await showTweets();
                throw new Error('`showTweets` should throw error');
            } catch (error) {
                assert.equal(error.message, "Сервер вернул объект без свойства text");
            }
        });
    });
});