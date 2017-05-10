'use strict';

const formatDate = require('./formatDate');
const twitterApi = require('./twitterApi');

const FAVORITE_HASHTAG = '#urfu';
const ACCESS_TOKEN = 'Hardcode here your access token';

/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console.
 */
function show() {
    return prepareTweets()
            .then(console.log)
            .catch(() => console.error('Failed to load tweets'));
}

/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console
 * char by char. One char in `interval` ms
 * @param {Number} 
 */
function showCharByChar(interval) {
    return prepareTweets()
            .then(tweets => printCharByChar(tweets, interval))
            .catch(() => console.error('Failed to load tweets')); 
}

function printCharByChar(str, interval) {
    return new Promise(resolve => {
        let charIndex = 0;
        function printNext() {
            if (charIndex < str.length) {
                process.stdout.write(str[charIndex++]);
                setTimeout(printNext, interval); 
            } else {
                resolve();
            }
        }
        printNext();
    });
}

function prepareTweets() {
    return twitterApi.searchTweets(FAVORITE_HASHTAG, ACCESS_TOKEN)
            .then(tweets => tweets.map(stringifyReadable))
            .then(tweets => tweets.join('\n\n'));
}

function stringifyReadable(tweet) {
    let createdDate = formatDate(new Date(tweet['created_at']));
    let text = tweet['text'];
    
    return createdDate + '\n' + text;
}

module.exports.show = show;
module.exports.showCharByChar = showCharByChar;
