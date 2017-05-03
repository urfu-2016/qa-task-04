"use strict"

const formatDate = require('./formatDate');
const request = require('request');


function showTweets() {
    // Здесь будет код, который получает твиты и
    // выводит их на консоль
	const url = "https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016";
	request(url, function (error, response, body) {
		if (error) {
			console.error(error.message);
		}
		if (response.statusCode !== 200) {
			console.error(response.statusCode);
		}
		try {
			const tweets = JSON.parse(body);
            tweets.forEach(tweet => {
                console.log(formatDate(tweet.created_at));
                console.log(tweet.text);
            });
        } catch (error) {
            console.error(error);
        }
	});
}
module.exports = showTweets;
