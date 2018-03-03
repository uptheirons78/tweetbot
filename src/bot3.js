const Twit = require('twit');
const config = require('./config');
const bot = new Twit(config);

const favorite = function() {
    // Set up your search parameters
    var params = {
      q: '#100DaysOfCode',
      count: 10,
      result_type: 'recent',
      lang: 'en'
    }
    
    // Initiate your search using the above paramaters
    bot.get('search/tweets', params, function(err, data, response) {
      // If there is no error, proceed
      if(!err){
        // Loop through the returned tweets
        for(let i = 0; i < data.statuses.length; i++){
          // Get the tweet Id from the returned data
          let id = { id: data.statuses[i].id_str }
          // Try to Favorite the selected Tweet
          bot.post('favorites/create', id, function(err, response){
            // If the favorite fails, log the error message
            if(err){
              console.log('Error from Bot N. 3');
            }
            // If the favorite is successful, log the url of the tweet
            else{
              let username = response.user.screen_name;
              let tweetId = response.id_str;
              console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
            }
          });
        }
      } else {
        console.log(err + ' from Bot N. 3');
      }
    });    
}

favorite();
setInterval(favorite, 1000*60*5);
