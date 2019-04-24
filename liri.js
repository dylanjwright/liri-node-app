require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv[3];

//------SPOTIFY------//

var spotThis = function(songName) {

    if(songName === undefined) {
        songName = "the sign ace of base";
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









//------COMMANDS------//

if(command === "spotify-this-song") {
    spotThis(query);
}