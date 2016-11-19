part = Math.PI / 10;
sangle = Math.PI / 20;
bx = 760;
by = 490;
br = 300;
white = "#FFC4A4";
red = "#900";
green = "#080";
var canvas = document.getElementById("dartsgameCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(bx, by, 1.3*br, 0, Math.PI*2, false);
ctx.fillStyle = "#000";
ctx.fill();
ctx.closePath();
ctx.beginPath();
ctx.arc(bx, by, 1.28*br, 0, Math.PI*2, false);
ctx.arc(bx, by, 1.27*br, 0, Math.PI*2, true);
ctx.fillStyle = "#FFF";
ctx.fill();
ctx.closePath();
for (i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.arc(bx, by, br, sangle+part*i, sangle+part*(i+1), false);
    ctx.moveTo(bx, by);
    if (i % 2 == 0) {
        ctx.fillStyle = "#000";
    } else {
        ctx.fillStyle = white;
    }
    ctx.fill();
    ctx.closePath();
}
ctx.beginPath();
ctx.arc(bx, by, 1.3*br/40, 0, Math.PI*2, false);
ctx.fillStyle = red;
ctx.fill();
ctx.closePath();
ctx.beginPath();
ctx.arc(bx, by, 1.4*br/20, 0, Math.PI*2, false);
ctx.arc(bx, by, 1.3*br/40, 0, Math.PI*2, true);
ctx.fillStyle = green;
ctx.fill();
ctx.closePath();
for (i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(bx, by, br, sangle+part*i, sangle+part*(i+1), false);
    ctx.arc(bx, by, 19*(br/20), sangle+part*(i+1), sangle+part*(i), true);
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
    ctx.arc(bx, by, 12.5*(br/20), sangle+part*i, sangle+part*(i+1), false);
    ctx.arc(bx, by, 11.5*(br/20), sangle+part*(i+1), sangle+part*(i), true);
    if (i % 2 == 0) {
        ctx.fillStyle = red;
    } else {
        ctx.fillStyle = green;
    }
    ctx.fill();
    ctx.closePath();
}
ctx.fillStyle = "#FFF";
nums = ["20", "1", "18", "4", "13",
        "6", "10", "15", "2", "17",
        "3", "19", "7", "16", "8",
        "11", "14", "9", "12", "5"]
ctx.font = "40px Verdana";
for (i = 0; i < 20; i++) {
    ctx.save();
    ctx.translate(bx+1.13*Math.sin(part*i)*br, by-1.13*Math.cos(part*i)*br);
    ctx.rotate(Math.PI*2*i/20);
    ctx.textAlign = "center";
    ctx.fillText(nums[i],0, 0);
    ctx.restore();
}
