const request = require('request');
const formatDate = require('./formatDate');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

// Здесь будет код, который получает твиты и
// выводит их на консоль

function showTweets(cb) {
    request(url, (requestError, res, body) => {
        if (requestError) {
            console.error('request error');
            cb();
            return;
        } else if (res.statusCode !== 200) {
            console.error('status code error');
            cb();
            return;
        }
        let tweets = null;
        try {
            tweets = JSON.parse(body);
            tweets.forEach(tweet => {
                let result = `${formatDate(tweet.created_at)}\n"${tweet.text}"`;
                console.log(result);
            });
        } catch (Error) {
            console.error('invalid data received');
        }
        cb();
    });
}

module.exports = showTweets;