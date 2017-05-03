'use strict';
const formatDate = require('./formatDate');
const rp = require('request-promise');
const nock = require('nock');

function showTweets() {
    var options = {
      uri: 'https://api.twitter.com/1.1/search/tweets.json',
        qs: {q: '#urfu-testing-2016'}
    };

    return rp(options)
        .then(JSON.parse)
        .then(tweets => tweets.forEach((tweet) => {
                console.log(formatDate(new Date(tweet.created_at)));
                console.log(tweet.text);
            }));
}

module.exports = showTweets;