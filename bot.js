// Created By Eduardo Escoto. This software is open source and useable by anybody wanting to make a bot.
// Please Credit me when used.
// Ask me any questions about this code at @e_esc_ on twitter or at @eduardoescoto on github =)

let twit = require('twit');
let apiData = require('./apiKeys.js');
let Twitter = new twit(apiData);
let lastColor;
const tweetIntervalInMilliseconds = 1000 * 60 * 60 * 6; //setinterval uses milliseconds, this for examples is 6 hours

function postTweet(tweet) {
    let path = 'statuses/update';
    Twitter.post(path, tweet, (err, data, response) => console.log("Tweet Posted Successfuly"));
}

function tweetImage(path) {
    let fs = require('fs');
    const image_path = path;//local path to image to tweet
    let b64content = fs.readFileSync(image_path, {
        encoding: 'base64'
    });
    Twitter.post('media/upload', {
        media_data: b64content
    }, (err, data, response) => {
        media_ids = new Array(data.media_id_string);
        const tweetData = generateTweetData(media_ids);
        console.log("Tweeting the image: " + path);
        postTweet(tweetData);
    });

}
function generateImageTweetData(status, media_ids) {
    return {
        media_ids,
        status
    }
}
function generateTextTweetData(status) {
    return {
        status
    }
}

console.log(`Starting the cycle.`)
setInterval(() => {
    console.log("Running next cycle...");

}, tweetIntervalInMilliseconds);