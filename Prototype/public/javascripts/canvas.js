window.onload = draw;

function draw(){
    var canvas = document.getElementById('canvas');
    var con = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 12;
    var eyeRadius = 2;
    var eyeXOffset = 4;
    var eyeYOffset = 3;

    // draw face circle
    con.beginPath();
    con.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    con.fillStyle = 'yellow';
    con.fill();
    con.lineWidth = 1;
    con.strokeStyle = 'black';
    con.stroke();

    var eyeY = centerY - eyeYOffset;
    // draw left eye
    con.beginPath();
    var eyeX1 = centerX - eyeXOffset;
    con.arc(eyeX1, eyeY, eyeRadius, 0,  Math.PI, true);
    con.stroke();
    // draw right eye
    con.beginPath()
    var eyeX2 = centerX + eyeXOffset;
    con.arc(eyeX2, eyeY, eyeRadius, 0, Math.PI, true);
    con.stroke();

    // draw the mouth
    con.beginPath();
    con.arc(centerX, centerY * 1.15, 5.5, 0.1 * Math.PI, 0.9 * Math.PI, false);
    con.stroke();
}