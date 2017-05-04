'use strict';
const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(url, (requestError, res, body) => {
        if (requestError || res.statusCode !== 200) {
            return cb('Request failed');
        }

        var data;
        try {
            data = JSON.parse(body);
        }
        catch(parseError) {
            cb('Parse error');
        }

        data.forEach(tweet => {
            console.log(formatDate(tweet.created_at));
            console.log(tweet.text);
        });

        cb(null);
    });
}

module.exports = showTweets;
