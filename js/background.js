$(document).ready( function() {
	function changeColor(curNumber){
	    curNumber++;
	    if(curNumber > 9){
	        curNumber = 1;
	    }
	    document.body.setAttribute('class', 'color' + curNumber);
	    setTimeout(function(){changeColor(curNumber)}, 7000);  
	}
	changeColor(0);
	$('.glyphicon').click( function() {
		$(this).toggleClass('clicked');
	});
});