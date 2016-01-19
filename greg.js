function Song(title, album, artist, year, url){
		this.title = title;
		this.album = album;
		this.artist = artist;
		this.year = year;
		this.url = url;
		this.audioElement = "<audio src='" +
												this.url + "'></audio>";

		this.printDetails = title + " by " +
										    artist + ", (" +
										    album + ", " + 
										    year + ")";
	};

	function Jukebox(){
		
		this.songList = [];
		this.currentSongIndex = 0;

		this.currentSong = function(){
			return this.songList[this.currentSongIndex][0];
		};

		this.nextSong = function(){
			this.currentSongIndex += 1;
			if (this.currentSongIndex >= this.songList.length){
				this.currentSongIndex = 0;
			}
		};
		
		this.previousSong = function(){
			this.currentSongIndex -= 1;
			if (this.currentSongIndex < 0){
				this.currentSongIndex = 0;
			};
		}
		
		this.addSong = function(song){
			this.songList.push(song);	
		}

		this.getCurrentTime = function(){
			return this.currentSong().currentTime;	
		}

		this.getCurrentDuration = function(){
			return this.currentSong().duration;	
		}

		this.parseTime = function(time){
			var minutes = Math.floor((time % 3600000) / 60000);
			var seconds = Math.floor(((time % 3600000) % 60000) / 1000);
			if (seconds < 10){ 
				seconds = "0" + seconds;
			}
			return minutes + ":" + seconds;
		}

		this.play = function(){
			this.currentSong().play();	
		}

		this.pause = function(){
			this.currentSong().pause();	
		}

		this.stop = function(){
			this.currentSong().load();	
		}

	};


$(document).ready(function(){

	// setInterval(function(){
	// 	$("#current-time").html(currentSong.currentTime);
	// }, 1000);

	$("#play").on("click", function(){
		jukebox.play();
	});	

	$("#pause").on("click", function(){
		jukebox.pause();
	});

	$("#stop").on("click", function(){
		jukebox.stop();
	});

	$("audio").each(function(){
		jukebox.addSong($(this));	
	});
	
});

var jukebox = new Jukebox;
var testSong = new Song(title="Roy G Biv", 
										album="Music Has the Right to Children",
										artist="Boards of Canada",
										year="2002",
										url="roygbiv.mp3");

