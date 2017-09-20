var keysFile = require('./keys.js');

var Twitter = require('twitter');
var client = new Twitter(keysFile.twitterKeys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keysFile.spotifyKeys);

var fs = require('fs');
var choice = process.argv[2];
//var movieName = process.argv[3];

var request = require('request');


switch(choice){

case 'my-tweets':
	myTweet();	
	break;

case 'spotify-this-song':
	spotifySong();	
	break;

case 'movie-this':
	movieDetails();	
	break;

case 'do-what-it-says':
	callCommand();
	break;

}	


function myTweet(){
	
	var params = {screen_name: 'Sag27066383'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			// console.log(tweets);
			for(var i=0; i<tweets.length; i++){

	  			console.log(tweets[i].text);
	  		}
	    	//console.log(error);
	  	}

	  	});
}	

function callCommand(){

	fs.readFile("random.txt", "utf8", function(error, data){

		if(error)
		{
			console.log("This is from readfile" + error);
		}

		else{

			var argv = data.split(',');
			var songName = argv[1];
			
			spotify.search({ type: 'track', query: songName }, function(err, data) {

			    if ( err ) {
			        console.log('Error occurred: ' + err);
			    }

			    else{

			    	console.log("Song Name : " + data.tracks.items[0].name);
			    	console.log("Artist(s) name : " + data.tracks.items[0].artists[0].name);
			    	console.log("A preview link of the song from Spotify : " + data.tracks.items[0].preview_url);
			    	console.log("The album that the song is from : " + data.tracks.items[0].album.name);
     
			 	}
   
			});

		}
	});


}	


function movieDetails(){

	if(process.argv[3]){

		movieName = process.argv[3];
	}
	else {
		movieName = "Mr. Nobody"
	}	

	var omdbQueryUrl = "http://www.omdbapi.com/?t="+ movieName + "&y=&plot=short&apikey=40e9cece";


    request(omdbQueryUrl, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {

        	console.log("Title of the Movie : " +JSON.parse(body).Title);
           	console.log("Year the movie came out : " +JSON.parse(body).Year);
			console.log("IMBD Rating of the movie : " +JSON.parse(body).imdbRating);
			console.log("Country where the movie was produced : " +JSON.parse(body).Country);
			console.log("Language of the movie : " +JSON.parse(body).Language);
			console.log("Plot of the movie : " +JSON.parse(body).Plot);
			console.log("Actors in the movie : " +JSON.parse(body).Actors);
			console.log("Rotten Tomatoes URL : " + JSON.parse(body).Ratings[1].Source);

		}
				
	});	
		
}

function spotifySong(){

	var songName = process.argv[3];

	if(songName){

			spotify.search({ type: 'track', query: songName }, function(err, data) {

			    if ( err ) {
			        console.log('Error occurred: ' + err);
			    }

			    else{

			       	console.log("Song Name : " + data.tracks.items[0].name);
			    	console.log("Artist(s) name : " + data.tracks.items[0].artists[0].name);
			    	console.log("A preview link of the song from Spotify : " + data.tracks.items[0].preview_url);
			    	console.log("The album that the song is from : " + data.tracks.items[0].album.name);
     
			 	}
			}); 		
	}				 	
	else{

	 		spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {

	 			if ( err ) {
	        		console.log('Error occurred: ' + err);
	    		}

	    		else{

	    			console.log("Song Name : " + data.tracks.items[0].name);
			    	console.log("Artist(s) name : " + data.tracks.items[0].artists[0].name);
			    	console.log("A preview link of the song from Spotify : " + data.tracks.items[0].preview_url);
			    	console.log("The album that the song is from : " + data.tracks.items[0].album.name);
     				
			 	}

	 		});
	}	

}	
