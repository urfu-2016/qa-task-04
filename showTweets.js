const request = require('request');
const formatDate = require('./formatDate');

function showTweets(url, successCb, errorCb) {
  request(url, (requestError, res, body) => {
    if (requestError || res.statusCode !== 200) {
      return errorCb(requestError.message);
    }

    try {
      const tweets = JSON.parse(body).map(tweet => {
        return `${formatDate(tweet.created_at)}\n"${tweet.text}"`;
      });
      successCb(tweets.join("\n"))
    } catch (parseError) {
      errorCb('parse JSON error');
    }
  });

}

module.exports = showTweets;
