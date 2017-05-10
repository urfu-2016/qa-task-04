'use strict';

const rp = require('request-promise');

const SEARCH_API_URL = 'https://api.twitter.com/1.1/search/tweets.json';


/**
 * Function searches tweets by `query`
 * See The Search API Twitter
 * 
 * @param {String} query - string for search
 * @param {String} accessToken
 * @returns {Promise} promise to search tweets
 */
function searchTweets(query, accessToken) {
    var searchOptions = {
        uri: SEARCH_API_URL,
        qs: { q: query },
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    return rp.get(searchOptions)
        .then(JSON.parse)
        .then(response => {
            if (!response.hasOwnProperty('statuses')) {
                throw new SyntaxError('Incorrect JSON without field `statuses`');
            }
            return response['statuses'];
        });
}

exports.searchTweets = searchTweets;