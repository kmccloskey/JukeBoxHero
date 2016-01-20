function Song(title, album, artist, year, url){
	this.title = title;
	this.album = album;
	this.artist = artist;
	this.year = year;
	this.url = url;
	this.audioElement = new Audio(src=url); 
	this.printDetails = title + " by " +
	artist + ", (" +
		album + ", " + 
		year + ")";
};

function Jukebox(){
	
	this.songList = [];
	this.currentSongIndex = 0;

	this.currentSong = function(){
		return this.songList[this.currentSongIndex];
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
		this.currentSong().audioElement.play();	
	}

	this.pause = function(){
		this.currentSong().audioElement.pause();	
	}

	this.stop = function(){
		this.currentSong().audioElement.load();	
	}

	this.drawLabels = function(container){
		var songIndex = 0;
		$(this.songList).each(function(){
			var songText = this.printDetails;
			var songDiv = $("<div class='col-sm-10 song_each col-sm-offset-1'>" + songText + "</div>")
			$(songDiv).attr("data-song-id", songIndex);
			container.append(songDiv);
			songIndex++;
		})	
	}
};


$(document).ready(function(){

	// setInterval(function(){
	// 	$("#current-time").html(currentSong.currentTime);
	// }, 1000);
	var song1 = new Song(title="As Colorful as Ever", 
		album="Layers",
		artist="Broke For Free",
		year="2016",
		url="audio/as_colorful_as_ever.mp3");

	var song2 = new Song(title="Reading the Greens", 
		album="Stance Gives You Balance",
		artist="Hogan Grip",
		year="2016",
		url="audio/reading_the_greens.mp3");

	var song3 = new Song(title="Five Minutes at the Rainforest Cafe", 
		album="Celadon",
		artist="Macaw",
		year="2016",
		url="audio/five_minutes_at_the_rainforest_cafe.mp3");

	jukebox = new Jukebox;	
	jukebox.addSong(song1);
	jukebox.addSong(song2);
	jukebox.addSong(song3);
	jukebox.drawLabels($("#song-container"));

	var currentSongIndex; 

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

	$(document).on("click", ".song_each", function(){
		console.log("clicked!");
		var songText = $(this).html();
		$(".player").html(songText);
		jukebox.currentSongIndex = $(this).attr("data-song-id");
	});
});

