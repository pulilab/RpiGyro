if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation is supported");
}
try {
    var ws = new WebSocket('ws://192.168.0.42:8000');
    ws.onopen = function (event) {
            console.debug('open');
            window.addEventListener("devicemotion", handleMotionEvent, true);
    };
}catch(e) {
        console.log(e);
}

function send(x, y, z) {
  var xx = translateMotionToDeg(x);
  var yy = translateMotionToDeg(y);
  var zz = translateMotionToDeg(z);
 console.log('X: ' + xx + ' Y: ' +yy+' Z: '+zz);
  ws.send(JSON.stringify({
                'x': xx,
                'y': yy,
                'z': zz
        }));
}

function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    send(x,y,z);
    // Do something awesome.
}

function translateMotionToDeg(x) {
  return (Math.floor(x)+10)*9;
}
