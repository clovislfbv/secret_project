var $j = jQuery.noConflict();

var initialCount = 60;
var count = initialCount;

function timer() {
    count = count - 1;
    if (count <= -1) {
        count = initialCount;
        var el = $j(".circle-timer");
        el.before( el.clone(true) ).remove();
    }

    $j(".count").text(count);
}

setInterval(timer, 1000);

$j(".circle-timer").on("click", function(){
	if ($j(".circle-timer").hasClass('paused')) {
        $j(".circle-timer").removeClass("paused");
		timerPause = true;
	} else {
        $j(".circle-timer").addClass("paused")
		timerPause = false;
	}
});