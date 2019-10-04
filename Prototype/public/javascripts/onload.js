window.onload = init;
var imageNum = 1;
var drawPosition = 0;

function init() {
    // dropdown menu init
    var allLinks = document.getElementsByTagName("a");
    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className == "menuLink") {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
    // image animation init
    window.setInterval("changeImg()", 1200);
    // canvas init and animation
    setInterval(draw, 50);
}

function changeImg() {
    imageNum++;
    if (imageNum > 3) {
        imageNum = 1;
    }
    var img = document.getElementById("rollingImage");
    img.src = "/img/" + imageNum + ".jpg";
}


function clickHandler(event) {
    event.preventDefault();
}

function toggleMenu() {
    var startMenu = this.href.lastIndexOf("/") + 1;
    var stopMenu = this.href.lastIndexOf(".");
    var thisMenuName = this.href.substring(startMenu, stopMenu);
    var menuParent = document.getElementById(thisMenuName).parentNode;
    var thisMenuStyle = document.getElementById(thisMenuName).style;

    thisMenuStyle.display = "block";

    menuParent.onmouseout = function() {
        thisMenuStyle.display = "none";
    };

    menuParent.onmouseover = function() {
        thisMenuStyle.display = "block";
    };
}

function draw() {
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.font = "25px Verdana";
    var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    c.fillStyle = gradient;
    drawPosition++;
    if (drawPosition > canvas.width) {
        drawPosition = 0;
    }
    c.fillText('Welcome User!', drawPosition, 25);
}
