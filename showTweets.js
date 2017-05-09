const formatDate = require('./formatDate');
const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';
const request = require('request');

function showTweets() {
    request(url, function (requestError, res, body) {
        if (requestError) {
            console.error(requestError.message);
            return;
        }
        if (res.statusCode !== 200) {
            console.error(res.statusCode);
            return;
        }
        try {
            const tweets = JSON.parse(body);
            tweets.forEach(function (tweet) {
                console.log(formatDate(tweet['created_at']));
                console.log(tweet['text']);
            });
        } catch (parseError) {
            console.error(parseError);
        }
    });
}

module.exports = showTweets;