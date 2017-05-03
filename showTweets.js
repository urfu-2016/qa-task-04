const formatDate = require('./formatDate');
const request = require('request');

const URL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(URL, (requestError, res, body) => {
        if (requestError) {
            return cb('Request error');
        }

        if (res.statusCode !== 200) {
            return cb(res.body)
        }

        try {
            const tweets = JSON.parse(body);
            printTweets(tweets);
            cb(null, tweets);
        } catch (parseError) {
            cb(parseError.message);
        }
    });
}

function printTweets(tweets) {
    checkTweets(tweets);

    tweets.forEach(tweet => {
        console.log(
            `\n${formatDate(tweet.created_at)}\n${tweet.text}\n`);
    });
}

function checkTweets(tweets) {
    tweets.forEach(tweet => {
        checkField(tweet, 'created_at');
        checkField(tweet, 'text');
    });
}

function checkField(tweet, field) {
    if (!tweet.hasOwnProperty(field)) {
        throw new Error(`Каждый твит должен содержать поле ${field}`);
    }
}

module.exports = showTweets;
