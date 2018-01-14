// Load the NPM Package inquirer
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require('request');
var Twitter = require('twitter');
var fs = require('fs');

 
var spotify = new Spotify({
  id: dotenv.parsed.SPOTIFY_ID,
  secret: dotenv.parsed.SPOTIFY_SECRET
});

var client = new Twitter({
	consumer_key: dotenv.parsed.TWITTER_CONSUMER_KEY,
	consumer_secret: dotenv.parsed.TWITTER_CONSUMER_SECRET,
	access_token_key: dotenv.parsed.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: dotenv.parsed.TWITTER_ACCESS_TOKEN_SECRET
  });


inquirer.prompt([
	{
		type: "list",
		name: "action",
		message: "What would you like Liri to do?",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
	  }

	]).then(function(choice) {
		// Trigger actions for Liri...
		liriActions(choice.action, false);

	});

function liriActions(action, inputVal){
	logData(action+" "+inputVal);
	if (action === "my-tweets") {
		//will show last 20 tweets
		console.log("twitter");
		getTweets();
	}else if(action === "spotify-this-song"){
		//show information artist, song name, preview link, albumn song appeared in
		//if no song is provided chose default song 
		console.log('spotify');
		var songTitle;
		if(!inputVal){
			inquirer.prompt([
				{
					type: "input",
					name: "song",
					message: "What song would you like information for?"
				  }
				]).then(function(reply) {
					logData(reply);
					console.log(reply.song);
					if(reply.song){
						songTitle = reply.song;
					}else{
						songTitle = "We Will Rock You"
					}
					searchSpotify(songTitle)
				});
		}else{
			searchSpotify(inputVal)
		}
		
	}else if(action === "movie-this"){
		//will show movie title, year, IMDB rating, rotten Tom rating, produced, lang, plot, actors
		//if no movie entered then return will be:
		// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
		// It's on Netflix!
		console.log('OMDB')
		if(!inputVal){
			inquirer.prompt([
				{
					type: "input",
					name: "movie",
					message: "What movie would you like information on?"
				}
				]).then(function(reply) {
					logData(reply);
					console.log(reply.movie);
					if(reply.movie){
						var movieTitle = reply.movie;
						searchOMDB(movieTitle);
					}else{
						var watchThis = `If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
						\nIt's on Netflix!`
						logData(watchThis);
						console.log(watchThis);
						return;
					}
				});
		}else{
			searchOMDB(inputVal)
		}
		
	}else if(action === "do-what-it-says"){
		itSays('random.txt');
	}
}

function getTweets(){
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', 'user_id=wisejd02', function(err, tweets, response) {
		
		if (!err) {
			var uLimit;
			if (tweets.length>20){
				uLimit = 20;
			}else{
				uLimit = tweets.length;
			}
						
			for(var i = 0; i <uLimit; i++){
				var tweet = tweets[i].text;
				var tweetTime = tweets[i].created_at;
				var results = `Tweet :${tweet}\n Time: ${tweetTime}`;
				logData(results);
				console.log(results);
			}
					
		}else{
			logData(err);
			console.log(err);
		}
	});
}

function searchSpotify(songTitle){
	spotify.search({ type: 'track', query: songTitle }, function(err, data) {
		if (err) {
			logData(err);
			return console.log('Error occurred: ' + err);
		}
			var artists= data.tracks.items[0].album.artists[0].name;
			var albumn = data.tracks.items[0].album.name;
			var title = data.tracks.items[0].name;
			var link = data.tracks.items[0].external_urls.spotify;
			var results = `Artist(s): ${artists}
			Albumn: ${albumn}
			Title: ${title}
			Link: ${link}
			`;
			logData(results);
			console.log(results);
	  });
}

function searchOMDB(movieTitle){
	var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
	request(queryURL, function (err, response, body) {
		if (err) {
			logData(err);
			return console.log('Error occurred: ' + err);
		}else{
			body = JSON.parse(body);
			var title = body.Title;
			var year = body.Year;
			var imdbRating = body.Ratings[0].Value;
			var rotTomRating = body.Ratings[1].Value;
			var production = body.Production;
			var lang = body.Language;
			var plot = body.Plot;
			var actors = body.Actors
			var results = `Title: ${title}
			Year: ${year}
			IMDB Rating: ${imdbRating}
			Rotten Tomato Rating: ${rotTomRating}
			Producers: ${production}
			Language: ${lang}
			Plot: ${plot}
			Actors: ${actors}
			`;
			logData(results);
			console.log(results);

		}

	});
	
}

function itSays(txtFile){
	fs.readFile(txtFile,'utf8', (err, data) => {
		if (err) throw err;
		var ranAction = data.split(",");
		ranAction[1]=ranAction[1].trim();
		liriActions(ranAction[0], ranAction[1]);
	  });
}

function logData(apndTxt){
	fs.appendFile('log.txt', apndTxt+"\n", (err) => {
		if (err) throw err;
		//console.log(`The ${apndTxt} was appended to file!`);
	  });
}