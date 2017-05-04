'use strict'

const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(url, (requestError, res, body) => {
            if (requestError || res.statusCode !== 200) {
                const errorMessage = requestError ? requestError.message : 'Request failed';
                return cb(errorMessage);
            }

            let data;
            try {
                data = JSON.parse(body);
            } catch (parseError) {
                cb('Parse error');
            }

            data.statuses.forEach(tweet => { 
                    const tweetDate = formatDate(new Date(tweet.created_at));
                    const result = `${tweetDate}\n${tweet.text}`;
                    console.log(result);
                    cb(null, result);
            });
            cb();

    });
}

module.exports = showTweets;
