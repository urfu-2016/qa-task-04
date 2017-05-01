const formatDate = require('./formatDate');
const nock = require('nock');
const Promise = require('bluebird');
const request = require('request');
const URL = require('url').URL;

const twitterUrl = new URL('https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016');

async function printSlowly(text) {
  for (const symbol of text.split('')) {
    await wait100ms();
    process.stdout.write(symbol);
  }
  process.stdout.write('\n');
}

async function printToConsole(tweet) {
  if (!tweet || !tweet.text || !tweet.created_at) {
    throw new Error("Incorrect format of data from server. " +
      "Need object {text: String, created_at: Data}");
  }
  console.log(formatDate(new Date(tweet.created_at)));
  await printSlowly(tweet.text);
}

async function wait100ms() {
  await Promise.fromNode(cb => setTimeout(cb, 100));
}

async function showTweets() {
  let [res, body] = await Promise.fromNode(cb => request.get(twitterUrl.href, cb),
    { multiArgs: true });
  nock.cleanAll();
  if (!body || res.statusCode !== 200) {
    throw new Error("Incorrect server answer");
  }
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch(e) {
    throw new Error("Answer from server must be JSON");
  }
  for (let tweet of parsedBody) {
    await printToConsole(tweet);
  }
}

module.exports = showTweets;
