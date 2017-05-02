const formatDate = require('./formatDate');
const rp = require('request-promise');
const nock = require('nock');


function printTweet(tweet) {
    console.log(formatDate(tweet['created_at']));
    console.log(tweet['text']);
}

function showTweets() {
    var options = {
      uri: 'https://api.twitter.com/1.1/search/tweets.json',
        qs: {q: '#urfu-testing-2016'}
    };

    return rp(options)
        .then(JSON.parse)
        .then(x => x.forEach(printTweet));
}

module.exports = showTweets;
