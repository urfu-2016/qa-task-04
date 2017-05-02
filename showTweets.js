const formatDate = require('./formatDate');
const request = require('request');

const url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

/**
 * Вывод твитов на консоль
 *
 * @param {Func} cb 
 */
function showTweets(cb) {
    request(url, (requestError, response, body) => {
        if (requestError) {
            console.error(requestError.message);
            return cb();
        } else if (response.statusCode !== 200) {
            console.error(response.statusCode);
            return cb();
        }
        try {
            const tweets = JSON.parse(body);
            tweets.forEach(tw => {
                console.log(formatDate(new Date(tw.created_at)));
                console.log(tw.text);
            });
        } catch (error) {
            console.error(error);
        }
        return cb();
    });
}

module.exports = showTweets;