const request = require(`request`);
const url = `https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016`;
const formatDate = require(`./formatDate`);

function showTweets(cb)
{
    request(url, (requestError, res, body) =>
    {
        if (requestError)
        {
            console.error(requestError);
            cb();
            return;
        }
        if (res.statusCode !== 200)
        {
            console.error(`Status code is ${res.statusCode}`);
            cb();
            return;
        }

        try
        {
            const data = JSON.parse(body);
            data.forEach((message) =>
            {
                console.log(formatDate(message.created_at));
                console.log(message.text);
            })
        }
        catch (parseError)
        {
            console.error(parseError);
        }
        cb();
    });
}

module.exports = showTweets;
