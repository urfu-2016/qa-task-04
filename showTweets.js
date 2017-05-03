'use strict';

const got = require('got');

const formatDate = require('./formatDate');

const URL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets() {
    return got(URL, { json: true })
        .then(({ body: tweets }) => {
            for (const { created_at, text } of tweets) {
                console.log(`${formatDate(created_at)}\n"${text}"`);
            }
        });
}

module.exports = showTweets;
