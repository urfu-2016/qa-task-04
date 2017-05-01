'use strict';

const formatDate = require('./formatDate');
const twitterApi = require('./twitterApi');

const FAVORITE_HASHTAG = '#urfu';
const ACCESS_TOKEN = 'Hardcode here your access token';

/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console.
 */
function showTweets() {
    return twitterApi.searchTweets(FAVORITE_HASHTAG, ACCESS_TOKEN)
            .then(tweets => tweets.map(stringifyReadable))
            .then(tweets => tweets.join('\n\n'))
            .then(console.log)
            .catch(() => console.error('Failed to load tweets'));
}

function stringifyReadable(tweet) {
    let createdDate = formatDate(new Date(tweet['created_at']));
    let text = tweet['text'];
    
    return createdDate + '\n' + text;
}

module.exports = showTweets;
