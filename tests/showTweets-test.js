const assert = require('assert')
const nock = require('nock')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016'
const tweets = [
  {
    "created_at": "2017-04-25T15:09:10.609Z",
    "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
  },
  {
    "created_at": "2016-04-25T15:09:10.609Z",
    "text": "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"
  }
]

describe('showTweets', () => {
    let log, error
    beforeEach(() => {
        log = sinon.spy(console, 'log')
        error = sinon.spy(console, 'error')
    })

    afterEach(() => {
        console.log.restore()
        console.error.restore()
        nock.cleanAll()
    });
    /** Положительные тесты */
    describe('requiest is success', () => {
        const answers = {
            '2017-04-25T15:09:10.609Z': '25 апреля в 15:09',
            '2016-04-25T15:09:10.609Z': '25 апреля 2016 года в 15:09'
        }
        const formatDate = sinon.stub()

        Object.keys(answers).forEach(item => {
            formatDate.withArgs(item).returns(answers[item])
        })

        before(() => {
            showTweets = proxyquire('../showTweets', {
                './formatDate': formatDate
            })

            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .reply(200, tweets);
        })

        it('displays tweets on the console', done => {
            showTweets(url, log, error)
            done()
            assert(log.calledTwice)
            assert(log.calledWith('вчера в 15:09\n' + tweets[0]['text']))
            assert(log.calledWith('25 апреля 2016 года в 15:10\n' + tweets[1]['text']))
            assert(!error.called)
        });
    })

    /** Негативные тесты */
    describe('requiest is fail', () => {
        const answers = {
            '2017-04-25T15:09:10.609Z': '25 апреля в 15:09',
            '2016-04-25T15:09:10.609Z': '25 апреля 2016 года в 15:09'
        }

        before(() => {
            nock('https://api.twitter.com')
                .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
                .replyWithError('Error with request!')
        })

        it('displays error on console', done => {
            showTweets(url, log, error)
            done()
            assert(log.calledOnce)
            assert(error.notCalled)
            assert(log.calledWith('Error with request!'))
        });
    })

})

