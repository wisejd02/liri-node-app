# liri-node-app
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

my-tweets

This will show:
*last 20 tweets and when they were created at in your terminal/bash window.


spotify-this-song

Will follow with a prompt that will ask you for song title to get info for.

This will show the following information about the song in your terminal/bash window

  * Artist(s)
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from

If no song is provided then your program will default to "We Will Rock You" by Queen.


movie-this

Will follow with a prompt to ask you for movie title to get info for.

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

do-what-it-says

Performs liri actions dictated in random.txt file

--data can be found in log.txt file
--.env file with following info would need to be added for ful liri functionality:
	# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
