const assert = require('assert');
const showTweets = require('../showTweets');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nock = require('nock');

const mockTweets = [
  {
    'created_at': '2017-04-30T15:09:10.609Z',
    'text': 'test1'
  },
  {
    'created_at': '2016-04-25T15:09:10.609Z',
    'text': 'test2'
  }
]

function nockTwitterAPI(statusCode, mock) {
  nock('https://api.twitter.com')
    .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
    .reply(statusCode, typeof mock == 'string' ? mock : JSON.stringify(mock));
}

describe('showTweets', () => {
  describe('stdout tests', ()=>{
    let clock;

    beforeEach(function () {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      process.stdout.write.restore();
      nock.cleanAll();
      clock.restore();
    });

    it('should write to stdout by symbol interval by 100ms', async () => {
      nockTwitterAPI(200, mockTweets);
      const stdout = sinon.spy(process.stdout, 'write');
      const formatDate = sinon.stub();
      formatDate.withArgs(new Date('2017-04-30T15:09:10.609Z')).returns('15:09');
      formatDate.withArgs(new Date('2016-04-25T15:09:10.609Z')).returns('25 апреля 2016 в 15:09');
      const showTweets = proxyquire('../showTweets', {
        './formatDate': formatDate,
      });
      showTweets().then(()=> {
        const stdoutRes = [
          '15:09\n',
          't',
          'e',
          's',
          't',
          '1',
          '\n',
          '25 апреля 2016 в 15:09\n',
          't',
          'e',
          's',
          't',
          '2',
          '\n',
        ]
        stdoutRes.forEach(el => {
          assert(stdout.calledWith(el));
        });
        assert(stdout.callCount, stdoutRes.length);
      });
      clock.tick(30000);
    });
  });
  describe('exceptions', () => {

    afterEach(() => {
      nock.cleanAll();
    });
    
    it('should return "Incorrect server answer" error for 404 status code', async () => {
      nockTwitterAPI(404);
      try {
        await showTweets();
      } catch(e) {
        assert.equal('Incorrect server answer', e.message);
      }
    });
    it('should return "Incorrect server answer" error for empty body', async () => {
      nockTwitterAPI('');
      try {
        await showTweets();
      } catch(e) {
        assert.equal('Incorrect server answer', e.message);
      }
    });
    it('should return "Answer from server must be JSON" error for' +
      ' not JSON response in body', async () => {
      nockTwitterAPI(200, 'not json');
      try {
        await showTweets();
      } catch(e) {
        assert.equal('Answer from server must be JSON', e.message);
      }
    });
    it('should return "Incorrect format of data..." error ' +
      'for incorrect tweets json with empty text', async () => {
      const incorrectTweetsJSON = [
        {
          'created_at': '2017-04-30T15:09:10.609Z',
          'text': ''
        },
        {
          'created_at': '2016-04-25T15:09:10.609Z',
          'text': 'test2'
        }
      ]
      nockTwitterAPI(200, incorrectTweetsJSON);
      try {
        await showTweets();
      } catch(e) {
        assert.equal('Incorrect format of data from server. Need object' +
          ' {text: String, created_at: Data}', e.message);
      }
    });
    it('should return "Incorrect format of data..." error ' +
      'for incorrect tweets json with empty date', async () => {
      const incorrectTweetsJSON = [
        {
          'created_at': '',
          'text': 'test1'
        },
        {
          'created_at': '2016-04-25T15:09:10.609Z',
          'text': 'test2'
        }
      ]
      nockTwitterAPI(200, incorrectTweetsJSON);
      try {
        await showTweets();
      } catch(e) {
        assert.equal('Incorrect format of data from server. Need object' +
          ' {text: String, created_at: Data}', e.message);
      }
    });
  });
});