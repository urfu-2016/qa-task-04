const formatDate = require('./formatDate');
const request = require('request');

const tweetsUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets() {
    request(tweetsUrl, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.error(error);
        }

        try {
            const tweets = JSON.parse(body);
            tweets.forEach(tweet => {
                console.log(`${formatDate(tweet.created_at)}\n"${tweet.text}"\n`);
            });
        } catch (parseError) {
            console.error(parseError);
        }
    });
}

module.exports = showTweets;
