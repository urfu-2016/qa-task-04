module.exports = showTweets;

const request = require('request');
const formatDate = require('./formatDate');

function showTweets() {
    request('https://api.twitter.com/1.1/search/tweets.json?q=%23urfu-testing-2016',
         function (error, response, body) {
          if(error){
              console.log(error)
          }
          else{
              body = JSON.parse(body)
              body.forEach(function(item, i, body) {
                  //date = formatDate(item['created_at'])
                  //console.log(date + '\n' + item['text'] + '\n' + ' ');
                  console.log('1')
              })
          }
        });
}
