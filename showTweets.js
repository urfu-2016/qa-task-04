'use strict';

const formatDate = require('./formatDate');
const request = require('request');
const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function formatTweet(body) {
    return `${formatDate(new Date(body.created_at))}\n${body.text}`;
}

function showTweets(cb) {
    request(url, (error, response, body) => {
        if (error) {
            console.error(error.message);
            return cb(error.message);
        }
        else if (response.statusCode !== 200) {
            console.error(response.statusCode);
            return cb(response.statusCode);
        }
        else {
            try {
                const incorrectJSONErrorMessage = 'JSON should be Array or object';
                if (!body) {
                    console.error(incorrectJSONErrorMessage);

                    return cb(incorrectJSONErrorMessage);
                }
                let data = JSON.parse(body);
                if (Array.isArray(data)) {
                    let formattedTweets = data
                        .map(tweet => formatTweet(tweet))
                        .join('\n');
                    console.log(formattedTweets);

                    return cb(null, formattedTweets);
                } else if (data instanceof Object) {
                    let tweet = formatTweet(data);
                    console.log(tweet);

                    return cb(null, tweet)
                } else {
                    console.error(incorrectJSONErrorMessage);

                    return cb(incorrectJSONErrorMessage);
                }
            }
            catch (error) {
                console.error('Parse error');
                return cb('Parse error')
            }
        }
    });
}

module.exports = showTweets;
