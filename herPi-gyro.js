// Global variables
var x, y, z;

// SOCKET INIT
var webSocketAddr = 'ws://192.168.0.42:8000/';
var gyroS = new WebSocket(webSocketAddr);

gyroS.onopen = function (event) {
	document.getElementById('connected').innerHTML = 'Connected to websocket @' + webSocketAddr;
};

addEventListener("click", function() {

  var el = document.documentElement;
  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
  rfs.call(el);

});


window.setTimeout(function() {
	if (window.DeviceOrientationEvent) {
		document.getElementById('gotOr').innerHTML = 'Orientation:';


		window.addEventListener("deviceorientation", function(eventData) {
			// BETA
			x = ~~eventData.beta;

			// GAMMA
			y = ~~eventData.gamma;

			// ALPHA
			z = ~eventData.alpha;

		});

		window.setTimeout(interval, 1000);



	} else {
		console.warn('No deviceorientation on device!!');
	}
}, 0);

function interval() {
	window.setInterval(function() {

		var xx = (y > 0) ? -(y-90) :
						(y > -45) ? 90 :
						0;

		var yy = ((x > 45 && x < 135) ? 45 :
										(x < -136) ? - x - 180 :
										(x < -45) ? -45 :
										(x >= 135) ? -(x-180) :
										x) + 45;

		var zz = Math.abs(((x >= -90 && x<= 90) ? // If looking downwards...
													((z >= -90) ? z + 90 :
													 	(z <= -270) ? z + 450 :
													 	(z >= -180) ? 0 :
													 	180) :
											(z >= -90) ? 180 : // Looking upwards
											(z <= -270) ? 0 :
											(z + 270)) - 180);

			gyroS.send( JSON.stringify(
				{
					x: (yy || 1).toFixed(2),
					y: (xx || 1).toFixed(2),
					z: (zz || 1).toFixed(2)
				}
			));

		document.getElementById('roll').innerHTML = yy;
		document.getElementById('pitch').innerHTML = xx;
		document.getElementById('yaw').innerHTML = zz;
	}, 80);
}