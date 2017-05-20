const formatDate = require('./formatDate');
const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';
const request = require('request');

function showTweets(cb) {
    request(url, function (requestError, res, body) {
        if (requestError) {
            console.error(requestError.message);
            return cb(requestError.message);
        }
        if (res.statusCode !== 200) {
            console.error(res.statusCode);
            return cb(res.statusCode);
        }
        try {
            const tweets = JSON.parse(body);
            tweets.forEach(function (tweet) {
                if ((tweet.hasOwnProperty('created_at')) && (tweet.hasOwnProperty('text'))) {
                    console.log(formatDate(tweet.created_at));
                    console.log(tweet.text);
                } else {
                    console.error('There are not required fields in tweet');
                    return cb('There are not required fields in tweet');
                }
            });
        } catch (parseError) {
            console.error(parseError);
        }
        return cb();
    });
}

module.exports = showTweets;