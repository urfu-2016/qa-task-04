// 'use strict';

// const request = require('request-promise');

// const apiUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=%23loltweet';

// //const bearerToken = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');



const showTweets = require('./showTweets.js');
showTweets();
console.info(1);

// // let oAuthOptions = {
// //     url: 'https://api.twitter.com/oauth2/token',
// //     headers: {
// //         'Authorization': `Basic ${bearerToken}`,
// //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// //     },
// //     body: 'grant_type=client_credentials'
// // };

// // request.post(oAuthOptions, (error, resp, body) => {
// //     //console.log(resp);
// //     console.log(body);
// // });

// // let date = new Date('Wed Apr 26 23:28:05 +0000 2017');
// // let date2 = new Date();
// // console.info(date.getTimezoneOffset());
// // console.info(date2.toLocaleTimeString());

// // var p = new Promise(r => undefined ? r() : rej());


// // p.then(console.info);