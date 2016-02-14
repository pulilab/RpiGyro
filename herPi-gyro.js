// INIT
var x = 90;
var y = 2;
var z = 90;

var alpha, beta, gamma;

var gyroS = new WebSocket("ws://192.168.0.42:8000/");
gyroS.onopen = function (event) {
	console.info('Connected to WebSocket');
};

window.setTimeout(function() {
	if (window.DeviceOrientationEvent) {
		document.getElementById('gotOr').innerHTML = 'Orientation:';

  // 	var doc = window.document;
  // 	var docEl = doc.documentElement;

  // 	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

		// document.body.requestFullscreen();
		// requestFullscreen.call(docEl);
	}
}, 0);

window.addEventListener("deviceorientation", function(eventData) {		
	// BETA
	beta = eventData.beta;

	x = ~~beta - 90;
	if (x < 0) { x = x + 360 }

	// GAMMA
	gamma = eventData.gamma;

	y = Math.abs((-(~~gamma) + 90) - 180);
	y = y <= 0 ? 2 : y;

	// ALPHA
	alpha = ~~eventData.alpha;

	if (gamma < 0) { // up
		z = 90;
	} else { //down
		z = Math.abs(alpha -360);
	}
	// z = alpha;
	// z = Math.abs(alpha - 360);
	// z = (Math.floor(~~alpha/2)) + 90;
	//z = Math.abs(~~alpha - 360);
	//z = (z + 90)%360;
	//z = z > 270 ? 0 : z > 180 ? 180 : z;
	// z = (~~alpha + 90);
	//z = z > 180 ? 180 : z;
	// z = z <= 0 ? 2 : z;

});

window.setInterval(function() {
	gyroS.send(JSON.stringify(
		{
			x: x,
			y: y,
			z: 90 //TODO: fix z
		}
	));
	document.getElementById('roll').innerHTML = x;
	document.getElementById('pitch').innerHTML = y;
	document.getElementById('yaw').innerHTML = z;
}, 20);
