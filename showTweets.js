'use strict';

const request = require('request');
const formatDate = require('./formatDate');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

/**
 * Выводит на консоль список твитов
 * @param {Func} cb
 */
function showTweets(cb) {
    request(url, (requestError, res, body) => {
        if (requestError) {
            console.error(requestError);
            cb();
            return;
        } else if (res.statusCode !== 200) {
            console.error(res.status);
            cb();
            return;
        }
        try {
            const tweets = JSON.parse(body);
            tweets.forEach((tweet) => {
                console.log(formatDate(tweet.created_at));
                console.log(tweet.text);
            });
        } catch (parseError) {
            console.error(parseError);
        }
        cb();
    });
}

module.exports = showTweets;
