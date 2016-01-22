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

	this.volumeUp = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				this.audioElement.volume += 0.1;
			}	
		});
	}

	this.volumeDown = function(soundName, volume){
		$(this.soundList).each(function(){
			if (this.name == soundName){
				this.audioElement.volume -= 0.1;
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

	$(".play").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.play(sound);
	});	

	$(".volume-up").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.volumeUp(sound);
	});	

	$(".volume-down").on("click", function(){ 
		var sound = $(this).attr("data-audio");
		jukebox.volumeDown(sound);
	});

	$("#stop").on("click", function(){
		jukebox.stopAll();
	});

	$("#play").on("click", function(){
		jukebox.playAll();
	});

	$("#pause").on("click", function(){
		jukebox.pauseAll();
	});

	$("#random").on("click", function(){
		jukebox.randomize();
	})
});


