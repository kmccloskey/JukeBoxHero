// As Colorful as Ever, Broke For Free, Layers, 2016, as_colorful_as_ever.mp3
// Reading the Greens, Hogan Grip, Stance Gives You Balance, 2016, reading_the_greens.mp3
// Five Minutes at the Rainforest Cafe, Macaw, Celadon, 2016, five_minutes_at_the_rainforest_cafe.mp3

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

jukebox.addSong(song1);
jukebox.addSong(song2);
jukebox.addSong(song3);
