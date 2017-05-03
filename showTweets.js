'use strict';

const formatDate = require('./formatDate');
const request = require('request');
const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function formatTweet(body) {
    return `${formatDate(new Date(body.created_at))}\n${body.text}`;
}

function showTweets() {
    request(url, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        else if (response.statusCode !== 200) {
            console.error(response.statusCode);
        }
        else {
            try {
                let tweets = JSON.parse(body);
                tweets.forEach(tweet => console.log(formatTweet(tweet)));
            }
            catch (error) {
                console.error(error);
            }
        }
    });
}

module.exports = showTweets;
