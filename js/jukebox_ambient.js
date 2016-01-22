function Sound(name, url){
	this.name = name;
	this.url = url;
	this.audioElement = new Audio(src=url);
}

function Jukebox(){

	this.soundList = []; 
	
	this.addSound = function(sound){
		this.soundList.push(sound);
	}

	this.play = function(soundName){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				if (this.audioElement.paused == true){
					this.audioElement.play();
				} else {
					this.audioElement.pause();
				}
			}	
		});
	}

	this.stop = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				this.audioElement.load();
			}	
		});
	}

	this.isPaused = function(soundName){
		var paused = false;
		$(this.soundList).each(function(){
			if (this.name == soundName){
				paused = this.audioElement.paused;
				return false
				}	
		});
		return paused;
	}

	this.volumeUp = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				if (this.audioElement.volume < 0.9){
					this.audioElement.volume += 0.1;
				} else {
					this.audioElement.volume = 1.0;
				}
			}	
		});
	}

	this.volumeDown = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				if (this.audioElement.volume > 0.1){
					this.audioElement.volume -= 0.1;
				} else {
					this.audioElement.volume = 0;
				}
			}	
		});
	}
	
	this.setVolume = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				this.audioElement.volume = volume;
			}	
		});
	}

	this.getVolume = function(soundName){
		var currentVolume = false;
		$(this.soundList).each(function(){
			if (this.name == soundName){
				currentVolume = this.audioElement.volume;
				return false;
			}	
		});
		return currentVolume;
	}

	this.toggleLoop = function(soundName, loop){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				this.audioElement.loop = loop;
			}	
		});
	}

	this.playAll = function(){
		$(this.soundList).each(function(){
			this.audioElement.play();
		})
	}

	this.pauseAll = function(){
		$(this.soundList).each(function(){
			this.audioElement.pause();
		})
	}

	this.stopAll = function(){
		$(this.soundList).each(function(){
			this.audioElement.load();
		})
	}

	this.randomize = function(){
		$(this.soundList).each(function(){
			// randomize volumes of all sounds
			this.audioElement.volume = Math.random();
			// play a random subset of sounds 
			var randomBoolean = Math.random() < 0.5;
			if(randomBoolean){
				this.audioElement.play();
			}
		});
	}
		
};

$(document).ready(function(){

	fireSound = new Sound(name="fire", url="audio/fire.mp3") 
	rainSound = new Sound(name="rain", url="audio/rain.mp3") 
	windSound = new Sound(name="wind", url="audio/wind.mp3") 
	stormSound = new Sound(name="storm", url="audio/storm.mp3") 
	talkingSound = new Sound(name="talking", url="audio/talking.mp3") 
	tonesSound = new Sound(name="tones", url="audio/tones.mp3") 

	jukebox = new Jukebox;	 // create jukebox

	jukebox.addSound(fireSound); // add sounds
	jukebox.addSound(rainSound);
	jukebox.addSound(windSound);
	jukebox.addSound(stormSound);
	jukebox.addSound(talkingSound);
	jukebox.addSound(tonesSound);

	jukebox.setVolume('fire', 0.5); // initialize volume settings
	jukebox.setVolume('rain', 0.5);
	jukebox.setVolume('wind', 0.5);
	jukebox.setVolume('storm', 0.5);
	jukebox.setVolume('talking', 0.5);
	jukebox.setVolume('tones', 0.5);

	jukebox.toggleLoop('fire', true); // set to repeat (loop)
	jukebox.toggleLoop('rain', true);
	jukebox.toggleLoop('wind', true);
	jukebox.toggleLoop('storm', true);
	jukebox.toggleLoop('talking', true);
	jukebox.toggleLoop('tones', true);

	// add click elements to html elements to trigger jukebox methods
	var checkAll = function(){
		$(".play").each(function(){ // cycle through all play elements
			// get current volume (0-1 range), rescale to (.2 - 1) range
			var scaledVolume = 0.2 + (jukebox.getVolume($(this).attr("data-audio")) * 0.8)
			if(jukebox.isPaused($(this).attr("data-audio"))){
				$(this).addClass("paused");
			} else {
				$(this).removeClass("paused");
				// if not paused, set opacity to equal scaledVolume
				$(this).css("opacity", scaledVolume); 
			}
		});
	};

	$(".play").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.play(sound);
		checkAll();
	});	

	$(".volume-up").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.volumeUp(sound);
		checkAll();
	});	

	$(".volume-down").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.volumeDown(sound);
		checkAll();
	});

	$("#stop").on("click", function(){
		jukebox.stopAll();
		checkAll();
	});

	$("#play").on("click", function(){
		jukebox.playAll();
		checkAll();
	});

	$("#pause").on("click", function(){
		jukebox.pauseAll();
		checkAll();
	});

	$("#random").on("click", function(){
		jukebox.randomize();
		checkAll();
	})
});


