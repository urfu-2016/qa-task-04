const formatDate = require('./formatDate');
const axios = require('axios');
const request = require('request');

function showTweets(url, reject, resolve) {
    axios.get(url).then(res => {
        const tweets = res.data.map(item => `${formatDate(item.created_at)} \n ${item.text}`)
        resolve(tweets)
    }).catch(err => reject('Error with request!'))
}

module.exports = showTweets;
