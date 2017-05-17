const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(url, (requestError, res, body) => {
        if (requestError || res.statusCode !== 200) {
            return cb(requestError);
        }

        try {
            const tweets = JSON.parse(body);
            if (!(tweets instanceof Array)) {
                return cb(new Error('Data in response body is not array'));
            }            
            
            tweets.forEach(tweet => {
                console.log(formatDate(tweet.created_at));
                console.log(tweet.text);
            });

            cb();
        } catch (parseError) {
            cb(parseError);
        }
    });
}

module.exports = showTweets;
