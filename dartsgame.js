var targetNums = ["20", "1", "18", "4", "13",
                  "6", "10", "15", "2", "17",
                  "3", "19", "7", "16", "8",
                  "11", "14", "9", "12", "5"]
var greenNums = new Set(["1", "4", "6", "15", "17", "19", "16", "11", "9", "5"]);
var innerDoubleR = 19 / 20;
var outerTripleR = 12.5 / 20;
var innerTripleR = 11.5 / 20;
var outerBullR = 1.4 / 20;
var innerBullR = 1.3 / 40;

var pxHover = 3;
var rHover = 0.02;

var white = "#FFF";
var black = "#000";
var dartswhite = "#CEB494";
var red = "#900";
var green = "#080";
function drawDartsBoard() {
    part = Math.PI / 10;
    sangle = Math.PI / 20;
    ctx.beginPath();
    ctx.arc(bx, by, 1.3*br, 0, Math.PI*2, false);
    ctx.fillStyle = black;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(bx, by, 1.28*br, 0, Math.PI*2, false);
    ctx.arc(bx, by, 1.27*br, 0, Math.PI*2, true);
    ctx.fillStyle = white;
    ctx.fill();
    ctx.closePath();
    for (i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.arc(bx, by, br, sangle+part*i, sangle+part*(i+1), false);
        ctx.moveTo(bx, by);
        if (i % 2 == 0) {
            ctx.fillStyle = black;
        } else {
            ctx.fillStyle = dartswhite;
        }
        ctx.fill();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.arc(bx, by, innerBullR * br, 0, Math.PI*2, false);
    ctx.fillStyle = red;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(bx, by, outerBullR * br, 0, Math.PI*2, false);
    ctx.arc(bx, by, innerBullR * br, 0, Math.PI*2, true);
    ctx.fillStyle = green;
    ctx.fill();
    ctx.closePath();
    for (i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(bx, by, br, sangle+part*i, sangle+part*(i+1), false);
        ctx.arc(bx, by, innerDoubleR * br, sangle+part*(i+1), sangle+part*(i), true);
        if (i % 2 == 0) {
            ctx.fillStyle = red;
        } else {
            ctx.fillStyle = green;
        }
        ctx.fill();
        ctx.closePath();
    }
    for (i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc(bx, by, outerTripleR * br, sangle+part*i, sangle+part*(i+1), false);
        ctx.arc(bx, by, innerTripleR * br, sangle+part*(i+1), sangle+part*(i), true);
        if (i % 2 == 0) {
            ctx.fillStyle = red;
        } else {
            ctx.fillStyle = green;
        }
        ctx.fill();
        ctx.closePath();
    }
    ctx.fillStyle = white;
    fontsize = Math.round(3*br/20).toString();
    ctx.font = fontsize+"px Verdana";
    for (i = 0; i < 20; i++) {
        ctx.save();
        ctx.translate(bx+1.13*Math.sin(part*i)*br, by-1.13*Math.cos(part*i)*br);
        ctx.rotate(Math.PI*2*i/20);
        ctx.textAlign = "center";
        ctx.fillText(targetNums[i],0, 0);
        ctx.restore();
    }
}

function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, 0.3*br/20, 0, Math.PI*2, false);
    ctx.fillStyle = "#444";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(x, y, 0.25*br/20, 0, Math.PI*2, false);
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.closePath();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(x-2*br/20, y);
    ctx.lineTo(x+2*br/20, y);
    ctx.stroke();
    ctx.moveTo(x, y-2*br/20);
    ctx.lineTo(x, y+2*br/20);
    ctx.stroke();
}

function onMouseOver(e) {
    rect = e.target.getBoundingClientRect();
    canvas.addEventListener('mousemove', onMouseMove, false);
}

function onMouseOut() {
    canvas.removeEventListener('mousemove', onMouseMove, false);
}

function checkTargetNum(theta) {
    t = Math.PI * 11 / 20 - theta;
    if (t < 0) {
        t = Math.PI*2 + t;
    }
    for (var i=1; i<21; i++) {
        if (t < Math.PI*i/10) {
            return targetNums[i-1];
        }
    }
}

function checkTarget(x, y) {
    r = Math.sqrt(Math.pow(bx - x, 2) + Math.pow(by - y, 2));
    theta = Math.asin((by - y) / r);
    if (bx - x >= 0) {
        theta = -theta + Math.PI;
    }
    num = checkTargetNum(theta);
    if (br < r) {
        return null;
    }
    else if (innerDoubleR * br <= r && r <= br) {
        return "d"+num;
    }
    else if (outerTripleR * br < r && r < innerDoubleR * br) {
        return "o"+num;
    }
    else if (innerTripleR * br <= r && r <= outerTripleR * br) {
        return "t"+num;
    }
    else if (outerBullR * br < r && r < innerTripleR * br) {
        return "i"+num;
    }
    else if (innerBullR * br <= r && r <= outerBullR * br) {
        return "sb";
    }
    else if (r < innerBullR * br) {
        return "db";
    }
}

function drawSegmentIsHover(target) {
    if (target == "sb") {
        ctx.beginPath();
        ctx.arc(bx, by, pxHover+outerBullR * br, 0, Math.PI*2, false);
        ctx.arc(bx, by, innerBullR * br, 0, Math.PI*2, true);
        ctx.fillStyle = white;
        ctx.fill();
        ctx.closePath();
    }
    else if (target == "db") {
        ctx.beginPath();
        ctx.arc(bx, by, pxHover+innerBullR * br, 0, Math.PI*2, false);
        ctx.fillStyle = white;
        ctx.fill();
        ctx.closePath();
    }
    else {
        type = target[0];
        num = target.slice(1, target.length);
        i = targetNums.indexOf(num);
        if (0 <= i <= 4) {
            sectorCenter = Math.PI*2 * (3/4) + i * Math.PI / 10;
        }
        else {
            sectorCenter = i * Math.PI / 10 - Math.PI*2 * (1 / 4);
        }
        if (type == "d") {
            outerR = br;
            innerR = innerDoubleR * br;
            if (greenNums.has(num)) {
                ctx.fillStyle = green;
            }
            else {
                ctx.fillStyle = red;
            }
        }
        else if (type == "o") {
            outerR = innerDoubleR * br;
            innerR = outerTripleR * br;
            if (greenNums.has(num)) {
                ctx.fillStyle = dartswhite;
            }
            else {
                ctx.fillStyle = black;
            }
        }
        else if (type == "t") {
            outerR = outerTripleR * br;
            innerR = innerTripleR * br;
            if (greenNums.has(num)) {
                ctx.fillStyle = green;
            }
            else {
                ctx.fillStyle = red;
            }
        }
        else if (type == "i") {
            outerR = innerTripleR * br;
            innerR = outerBullR * br;
            if (greenNums.has(num)) {
                ctx.fillStyle = dartswhite;
            }
            else {
                ctx.fillStyle = black;
            }
        }
        ctx.fillStyle = white;
        ctx.beginPath();
        ctx.arc(bx, by, outerR+pxHover, sectorCenter-(Math.PI/20+rHover), sectorCenter+(Math.PI/20+rHover), false);
        ctx.arc(bx, by, innerR-pxHover, sectorCenter+(Math.PI/20+rHover), sectorCenter-(Math.PI/20+rHover), true);
        ctx.fill();
        ctx.closePath();
    }
}

function onMouseMove(e) {
    target = moveActions.updateTarget(e);
    moveActions.throttle(moveActions.over, target, 10);
}

var moveActions = {
    timer: null,
    updateTarget: function(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        return checkTarget(x, y);
    },

    throttle: function(targetFunc, target, time) {
        var _time = time || 100;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          targetFunc(target);
        }, _time);
    },

    over: function(target) {
        if (target == null) {
            ctx.globalAlpha = 1.0;
            drawDartsBoard();
        } else {
            ctx.globalAlpha = 1.0;
            drawDartsBoard();
            ctx.globalAlpha = 0.5;
            drawSegmentIsHover(target);
        }
    },
}

var canvas = document.getElementById("dartsgameCanvas");
canvas.width = 640
canvas.height = 480
bx = canvas.offsetWidth*0.5;
by = canvas.offsetHeight*0.5;
if (bx < by) {
    br = bx * 0.75;
} else {
    br = by * 0.75;
}
var ctx = canvas.getContext("2d");
drawDartsBoard();
canvas.addEventListener('click', onClick, false);
canvas.addEventListener('mouseover', onMouseOver, false);
canvas.addEventListener('mouseout', onMouseOut, false);
