const request = require('request');
const formatDate = require('./formatDate');

function showTweets(cb)
{
	var url = "https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016";
    request(url, (requestError, StatusCode, body) =>
    {
        if (requestError)
        {
            console.error(requestError);
            cb();
            return;
        }
        if (StatusCode.statusCode !== 200)
        {
            console.error('StatusCode is ${StatusCode.statusCode}');
            cb();
            return;
        }

        try
        {
            const tweets = JSON.parse(body);
            tweets.forEach
			(
				(message) =>
				{
					console.log(formatDate(message.created_at));
					console.log(message.text);
				}
			)
        }
        catch (parseError)
        {
            console.error(parseError);
        }
        cb();
    });
}

module.exports = showTweets;