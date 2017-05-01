'use strict';

const formatDate = require('./formatDate');
const twitterApi = require('./twitterApi');

const FAVORITE_HASHTAG = '#urfu';
const ACCESS_TOKEN = 'Hardcode here your access token';

/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console.
 */
function showTweets() {
    return prepareTweets()
            .then(console.log)
            .catch(() => console.error('Failed to load tweets'));
}


/**
 * Function searches tweets by FAVORITE_HASHTAG and print it to console
 * by one word in 200ms
 */
function showTweetsTicker() {
    return new Promise((resolve, reject) => {
        prepareTweets()
            .then(tweetsString => {
                let words = tweetsString.split(/\n| /);
                function printNext()
                {
                    console.log(words[0]);
                    words.shift();
                    if (words.length === 0) {
                        resolve();
                    } else {
                        setTimeout(printNext, 200);
                    }
                }
                printNext();
            })
            .catch(reject); 
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

module.exports.showTweets = showTweets;
module.exports.showTweetsTicker = showTweetsTicker;
