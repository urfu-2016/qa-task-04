'use strict';

const formatDate = require('./formatDate');
const twitterApi = require('./twitterApi');

const FAVORITE_HASHTAG = '#urfu-testing-2016';
const ACCESS_TOKEN = 'Hardcode here your access token';

/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console.
 */
function showTweets() {
    return twitterApi.searchTweets(FAVORITE_HASHTAG, ACCESS_TOKEN)
            .catch(() => console.info('Failed to load tweets'))
            .then(tweets => tweets.map(stringifyReadable))
            .then(tweets => tweets.join('\n'))
            .then(console.info);
}

function stringifyReadable(tweet) {
    let createdDate = formatDate(tweet['created_at']);
    let text = tweet['text'];
    
    return createdDate + '\n' + text;
}

module.exports = showTweets;
