require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// var request = require("request");
var moment = require("moment");

var command = process.argv[2];
var query = process.argv.slice(3).join(" ") || undefined

//------SPOTIFY------//

var spotThis = function(songName) {
    if(songName === undefined) {
        songName = "the sign";
    };

    spotify.search({
        type: 'track',
        query: songName },
        function(err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        } 
        else { for (var i = 0; i < data.tracks.items[0].artists[i].length; i++);

        console.log("\nArtist(s): " + data.tracks.items[0].artists[i].name)
        console.log("Song: " + data.tracks.items[0].name); 
        console.log("Preview " + data.tracks.items[0].preview_url); 
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n"); 

        }
    }
)};

//------Bands in Town------//

var concThis = function(query){
    if(query === undefined) {
        query = "Tame Impala";
    };
    var bandUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";

    axios.get(bandUrl)
    .then(function (response) {
        console.log("\nVenue: " + response.data[0].venue.name)
        console.log("Location: " + response.data[0].venue.city)
        console.log("Date: " + (moment(response.data[0].datetime).format("MM/DD/YYYY"))+ "\n")
    }

    )}


//------OMDB------//


var movieThis = function (query) { 
    if(query === undefined) {
        query = "the matrix";
        console.log("\nIf you havent seen the matrix, then you should: https://www.imdb.com/title/tt0133093/")
    };
    var movieUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl)
        .then(function (response) {
            console.log("\nTitle: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            var ratings = response.data.Ratings;
            ratings.forEach(function(rating){
                if (rating.Source === 'Internet Movie Database' || rating.Source === 'Rotten Tomatoes'){
                    console.log(rating.Source + " rating: " + rating.Value)
                }
            })
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
        })
        .catch(function (err) {
            console.log(err)
        })
};




//------COMMANDS------//

if(command === "spotify-this-song") {
    spotThis(query);
}
else if (command === "concert-this") {
    concThis(query);
}
else if (command === "movie-this") {
    movieThis(query);
}
else if (command === "do-what-it-says") {
    doWhat(query);
}