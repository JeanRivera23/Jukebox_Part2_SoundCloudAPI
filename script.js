SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

SC.get("/tracks/79081413").then(function(response) {
  console.log(response);

  var art = response.artwork_url;
  var titulo = response.title;
  var trackUrl = response.permalink_url;
  var songInfo = response.description;
  var release = "Release: " + response.created_at;
  var genero = "Genre: " + response.genre;
  var userInfo = [response.user];
  var uploader = response.user.permalink;
  var uploaderPg = response.user.permalink_url;

  // HTML elements stored in variables
  var artwork = document.getElementById("artwork");
  var trackName = document.getElementById("track");
  var trackPg = document.getElementById("trackPg");
  var info = document.getElementById("info");
  var rel = document.getElementById("rel");
  var gen = document.getElementById("gen");
  var userUrl = document.getElementById("userPg");

  artwork.src = art;
  track.textContent = titulo;
  track.href = trackUrl;
  info.textContent = songInfo;
  rel.textContent = release;
  gen.textContent = genero;
  userUrl.textContent = uploader;
  userUrl.href = uploaderPg;
});
// counter
var index = 0;

//Jukebox object constructor function: Jukebox object structure & methods
function Jukebox() {
  this.music = [];
  this.stream = SC.stream("/tracks/79081413");
}

//addSong method adds MP3s to Jukebox object
Jukebox.prototype.addTrack = function(songs) {
  this.music.push(songs);
}

//instantiation: jukebox object created, songs pushed into jukebox array
var juke = new Jukebox();

// adding tracks to new jukebox
juke.addTrack("/tracks/79081413");

// Jukebox object methods
Jukebox.prototype.play = function() {
  this.stream.then(function(player){
    player.play();
    // player.on("finish", function() {
    //   index++
    //   player.play();
    // })
  });
}

Jukebox.prototype.pause = function() {
  this.stream.then(function(player){
    player.pause();
  });
}

//Jukebox HTML elements stored in variables
var playBtn = document.getElementById("playBtn");
var pauseBtn = document.getElementById("pauseBtn");

//button event listeners
playBtn.addEventListener("click", function(event) {
 event.preventDefault();
 juke.play();
})

pauseBtn.addEventListener("click", function(event) {
 event.preventDefault();
 juke.pause();
})
