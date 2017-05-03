const formatDate = require('./formatDate');
const request = require('request');
 
function showTweets() {
    request('https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016', (err, resp, body) => {
        if ((resp.statusCode !== 200) | err) {
            console.error("Status: " + resp.statusCode + " Error: " + err)
            return;
        }
 
        body = JSON.parse(body);
        console.log(body);
    });
}
 
module.exports = showTweets;
