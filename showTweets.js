const formatDate = require('./formatDate');
const request = require('request');

// const nock = require('nock');
// const mockData = [
    // {
        // "created_at": "2017-04-25T15:09:10.609Z",
        // "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
    // },
    // {
        // "created_at": "2017-05-02T15:09:10.609Z",
        // "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
    // },
    // {
        // "created_at": "2017-05-01T15:09:10.609Z",
        // "text": "Библиотека #nock позволяет не только удобно писать тесты, но и вести разработку фронтеда, в то время, когда бекенд ещё только проектируется! #urfu-testing-2016"
    // },
    // {
        // "created_at": "2016-04-25T15:09:10.609Z",
        // "text": "Для подмены модулей раньше я использовал #mockery, а сейчас всей душой полюбил #proxyquire. #urfu-testing-2016"
    // }
// ];
// nock('https://api.twitter.com')
    // .get('/1.1/search/tweets.json?q=%23urfu-testing-2016.com')
    // .reply(200, JSON.stringify(mockData));
	
function showTweets() {
	return getTweets().then(tweets => {
		tweets.forEach(tweet => {
			console.log(formatDate(tweet.created_at));
			console.log(tweet.text);
			console.log('-------------------------------');
		})
	});	
}

function getTweets () {
	return new Promise((resolve, reject) => {
		request('https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016.com', function (error, response, body) {		
			if (error) {
				reject(error);
			}
		
			if (response.statusCode !== 200) {
				reject(new Error('API responsed with ' + response.statusCode));
			}
			
			try {
				resolve(JSON.parse(body));
			} 
			catch(error) {
				reject(new Error('Failed to parse JSON'));
			}
		});
	});
	
	
	
}

module.exports = showTweets;
