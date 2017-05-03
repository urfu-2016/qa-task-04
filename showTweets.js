const formatDate = require("./formatDate");
const nock = require("nock");
const request = require("request-promise");

const twitterQuery = 'https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function slowPrint(text) {
    for (let symbol of text) {
        await sleep(100);
        process.stdout.write(symbol);
    }
}

async function printTweets(tweets) {
    let output = "";
    for (let tweet of tweets) {
        output += `${formatDate(tweet.created_at)}\n${tweet.text}\n\n`;
    }
    await slowPrint(output);
}


async function parseTweets(tweets) {
    try {
        tweets = JSON.parse(tweets);
    } catch (error) {
        throw new Error("Сервер вернул не JSON")
    }

    if (typeof tweets !== "object") {
        throw new Error("Сервер вернул не объект")
    }

    for (let tweet of tweets) {
        if (!tweet.hasOwnProperty("created_at")) {
            throw new Error("Сервер вернул объект без свойства created_at")
        }

        if (!tweet.hasOwnProperty("text")) {
            throw new Error("Сервер вернул объект без свойства text")
        }
    }

    return tweets;
}


async function showTweets() {
    if (arguments.length) {
        throw new Error("Функция showTweets не принимает аргументы");
    }

    let response;
    try {
        response = await request.get(twitterQuery);
    } catch (error) {
        throw new Error("Запрос к серверу не удался или сервер вернул код ошибки отличный от 2хх")
    }

    const tweets = await parseTweets(response);
    await printTweets(tweets);
}

module.exports = showTweets;
