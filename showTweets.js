const formatDate = require('./formatDate');
const request = require('request');


function showTweets(cb) {
	
	const urladdr = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';
	request(urladdr, function (error, response, body) {
		if (error){	
			console.error(error.message);
            return cb();
		}
		else if (response.statusCode != 200) {
			console.log('statusCode:', response && response.statusCode);
            return cb();
		}
		else {
			try{
				const data = JSON.parse(body);
				data.forEach(tweet => {
					console.log(formatDate(tweet.createdAt) + '\n' + tweet.text);
                    return cb();
				});
			}
			catch (parseError){
				console.error(parseError.message);
                return cb();
			}
		}
	});

}

module.exports = showTweets;
