const formatDate = require('./formatDate');
const nock = require('nock');
const Promise = require('bluebird');
const request = require('request');

const twitterUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016'

const mockTwitterData = [
  {
    'created_at': '2017-04-30T15:09:10.609Z',
    'text': 'Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку' +
    ' фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016'
  },
  {
    'created_at': '2016-04-25T15:09:10.609Z',
    'text': 'Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил' +
    ' #proxyquire. #urfu-testing-2016'
  }
]

async function printSlowly(text) {
  text = text.split('')
  for (const symbol of text) {
    await wait100ms();
    process.stdout.write(symbol);
  }
  process.stdout.write('\n');
}

async function printToConsole(tweet) {
  console.log(formatDate(new Date(tweet.created_at)));
  await printSlowly(tweet.text);
}

async function wait100ms() {
  await Promise.fromNode(cb => setTimeout(cb, 100));
}

async function showTweets() {
  nock('https://api.twitter.com')
    .get('/1.1/search/tweets.json?q=%23urfu-testing-2016')
    .reply(200, JSON.stringify(mockTwitterData));
  let [, body] = await Promise.fromNode(cb => request.get(twitterUrl, cb),
    { multiArgs: true });
  nock.cleanAll();
  for (let tweet of JSON.parse(body)) {
    await printToConsole(tweet);
  }
}

module.exports = showTweets;
