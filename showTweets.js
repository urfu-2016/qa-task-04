'use strict';

const formatDate = require('./formatDate');
const request = require('request');

function formatTweet(tweet) {
    return formatDate(tweet.created_at) + '\n' + tweet.text;
}

function showTweets(cb) {
    // Здесь будет код, который получает твиты и
    // выводит их на консоль
    const url = "https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016";
    request(url, function (error, response, body) {
        if (error) {
            console.error(error.message);
            return cb(error.message);
        }
        if (response.statusCode !== 200) {
            console.error(response.statusCode);
            return cb(response.statusCode);
        }
        try {
            const tweets = JSON.parse(body);
            var res;
            if (Array.isArray(tweets)) {
                res = tweets
                    .map(tweet => formatTweet(tweet))
                    .join('\n');
            }
            else {
                res = formatTweet(tweets);
            }
            console.log(res);

            return cb(null, res);
        } catch (error) {
            console.error(error);
            return cb(error);
        }
    });
}
module.exports = showTweets;