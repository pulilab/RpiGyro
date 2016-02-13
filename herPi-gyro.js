
var x = 90;
var y = 2;
var z = 90;

var alpha;
var beta;
var gamma;

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


var mode = "deviceorientation"

window.addEventListener(mode, function(eventData) {
	// console.log(eventData.absolute);
	if (mode == "deviceorientation"){
		beta = eventData.beta; // DONE
	} else {
		beta = eventData.accelerationIncludingGravity.x;
	}

	x = ~~beta + 90;

	if (mode == "deviceorientation"){
		gamma = eventData.gamma; // DONE!
	} else {
		gamma = eventData.accelerationIncludingGravity.y;
	}

	y = -(~~gamma) + 90;
	y = y <= 0 ? 2 : y;

	// if (mode == "deviceorientation"){
	alpha = ~~eventData.alpha;
	// } else {
	// 	alpha = eventData.accelerationIncludingGravity.z;
	// }
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

function trans(x){
	return (Math.floor(x)+10) * 9;
}

window.setInterval(function() {
	gyroS.send(JSON.stringify(
		{
			x: x, //handles propeller
			y: y,
			z: 90
		}
	));
	document.getElementById('roll').innerHTML = x;
	document.getElementById('pitch').innerHTML = y;
	document.getElementById('yaw').innerHTML = z;
}, 20);
