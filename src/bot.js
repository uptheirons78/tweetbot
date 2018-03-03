const Twit = require('twit');
const config = require('./config');

const bot = new Twit(config);

//RETWEET BOT
const retweet = function() {
    const params = {
        q: '#100DaysOfCode, #100daysofcode, #100daysofCode', //required
        result_type: 'recent',
        lang: 'en'
    }
    bot.get('search/tweets', params, function(err, data) {
        if (!err) {
            const retweetId = data.statuses[0].id_str;
            bot.post('statuses/retweet/:id', {
                id: retweetId
            }, (err, response) => {
                err ? console.log(err) : console.log('Retweet Done!!!');
            });
        }
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

retweet();
setInterval(retweet, 1000*60*5);