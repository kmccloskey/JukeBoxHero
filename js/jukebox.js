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
		
	this.songList = []; // array for storing song objects
	this.currentSongIndex = 0; // integer for keeping track of where 
														 // in the songList is the current song

	// returns the song in the songList with index equal to currentSongIndex
	this.currentSong = function(){
		return this.songList[this.currentSongIndex];
	};

	// move the currentSongIndex forward (or reset to 0 if at last song)
	this.nextSong = function(){
		this.currentSongIndex += 1;
		if (this.currentSongIndex >= this.songList.length){
			this.currentSongIndex = 0;
		}

	};
	
	// move the currentSongIndex backward (but keep at 0 if already at 0)	
	this.previousSong = function(){
		this.currentSongIndex -= 1;
		if (this.currentSongIndex < 0){
			this.currentSongIndex = 0;
		};
	}

	// takes song object and adds to songList	
	this.addSong = function(song){
		this.songList.push(song);	
	}

	// get current position in current song
	this.getCurrentTime = function(){
		return this.currentSong().currentTime;	
	}

	// get duration/length in current song
	this.getCurrentDuration = function(){
		return this.currentSong().duration;	
	}

	// pretty parsing for the current time/duration 
	this.parseTime = function(time){
		var minutes = Math.floor((time % 3600000) / 60000);
		var seconds = Math.floor(((time % 3600000) % 60000) / 1000);
		if (seconds < 10){ 
			seconds = "0" + seconds;
		}
		return minutes + ":" + seconds;
	}

	// play the current song
	this.play = function(){
		this.currentSong().audioElement.play();	
	}

	// pause the current song
	this.pause = function(){
		this.currentSong().audioElement.pause();	
	}

	// stop (reload) the current song
	this.stop = function(){
		this.currentSong().audioElement.load();	
	}

	// function for choosing a random integer
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
	this.random = function(){
		var randomSongIndex = getRandomInt(min=0, max=this.songList.length);
		if (randomSongIndex == this.currentSongIndex) {
			this.random()

		}
		else{
			this.currentSongIndex = randomSongIndex
		}		
	}

	// populate html elements with data from songList
	this.drawLabels = function(container){
		var songIndex = 0; // set counter to 0
		$(this.songList).each(function(){  // cycle through songList
			var songText = this.printDetails; // grab string of song details
			// create div, populate with songText
			var songDiv = $("<div class='col-sm-10 song_each col-sm-offset-1'>" + songText + "</div>")
			$(songDiv).attr("data-song-id", songIndex); // add data attribute to each element corresponding to 
																									// index in songList
			container.append(songDiv); // append div to page
			songIndex++; // increment song counter by 1
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

	jukebox = new Jukebox;	 // create jukebox
	jukebox.addSong(song1);  // add songs to jukebox
	jukebox.addSong(song2);
	jukebox.addSong(song3);
	jukebox.drawLabels($("#song-container")); // update html with data

	var currentSongIndex; 

	// add click elements to html elements to trigger jukebox methods

	$("#play").on("click", function(){ 
		jukebox.play();
	});	

	$("#pause").on("click", function(){
		jukebox.pause();
	});

	$("#stop").on("click", function(){
		jukebox.stop();
	});

	$("#next").on("click", function(){
	jukebox.stop();	
	jukebox.nextSong();
	var currentSongIndex = jukebox.currentSongIndex
	$(".player").html($('[data-song-id = "'+currentSongIndex +'"]').html())
	jukebox.play();
	});

	$("#back").on("click", function(){
	jukebox.stop();	
	jukebox.previousSong();
	var currentSongIndex = jukebox.currentSongIndex
	$(".player").html($('[data-song-id = "'+currentSongIndex +'"]').html())
	jukebox.play();
	
	});

	$("#random").on("click", function(){
	jukebox.stop();
	jukebox.random();
	var currentSongIndex = jukebox.currentSongIndex
	$(".player").html($('[data-song-id = "'+currentSongIndex +'"]').html())
	jukebox.play();
	});

	// add click element to song listings to update player readout
	// and update current song index
	$(document).on("click", ".song_each", function(){
		var songText = $(this).html();
		$(".player").html(songText);
		jukebox.currentSongIndex = $(this).attr("data-song-id");
	});
});


