require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// var request = require("request");
// var moment = require("moment");

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

// var concThis = function(concArtist){

//     axios.get("https://rest.bandsintown.com/artists/" + concArtist + "/events?app_id=codingbootcamp").then(
       
//         if (err)
// }


//------OMDB------//


var movieThis = function (query) { 
    if(query === undefined) {
        query = "the matrix";
    };
    var movieUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl)
        .then(function (response) {
            console.log("\nTitle: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            var ratings = response.data.Ratings
            ratings.filter(function(rating){
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