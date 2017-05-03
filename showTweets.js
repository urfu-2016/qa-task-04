const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function showTweets(cb) {
    request(url, (requestError, res, body) => {
            const data = JSON.parse(body);
            const tweets = data.statuses.map(tweet => {
                return {'created_at': tweet.created_at, 'text': tweet.text}});
            
            tweets.forEach(tweet => { 
                const tweetDate = formatDate.formatDate(new Date(tweet.created_at));
                const result = `${tweetDate}\n${tweet.text}`;
                console.log(result);});
            cb();
    });
}

module.exports = {
    showTweets: showTweets
};
