'use strict'

const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(url, (requestError, res, body) => {
            if (requestError) {
                cb(requestError.message);
            }

            let tweets;
            try {
                const data = JSON.parse(body);
                tweets = data.statuses.map(tweet => {
                    return {'created_at': tweet.created_at, 'text': tweet.text}
                });
            } catch (parseError) {
                cb(parseError);
            }

            tweets.forEach(tweet => { 
                const tweetDate = formatDate.formatDate(new Date(tweet.created_at));
                const result = `${tweetDate}\n${tweet.text}`;
                console.log(result);
                cb(null, result);
            });
                
    });
}

module.exports = {
    showTweets: showTweets
};
