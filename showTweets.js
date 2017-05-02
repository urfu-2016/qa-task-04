'use strict';

const request = require('request');

const formatDate = require('./formatDate').formatDate;

const twitterUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets() {
    return new Promise((resolve, reject) => {
        request(twitterUrl, (requestError, res, body) => {
            if (requestError || res.statusCode !== 200) {
                reject(requestError.message);
            }

            try {
                const data = JSON.parse(body);

                data.forEach(item => {
                    item.created_at = formatDate(item.created_at);
                    console.log(`${item.created_at}\n${item.text}`);
                });

                resolve(null);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
}

module.exports = showTweets;
