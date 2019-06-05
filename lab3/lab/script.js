var dx = 0;
var dy = 0;

function generateVector() {
    dx = Math.ceil(Math.random() * 100.0) + 100.0;
    dy = Math.ceil(Math.random() * 100.0) + 100.0;
    document.getElementById("vectorInfo").textContent = `GENERATED VECTOR: [${dx}px, ${dy}px]`;
}

var animatable = document.querySelectorAll(".animatable");
// forEach method
animatable.forEach(function (anim) {
    anim.style.position = "relative";
    anim.style.left = "0px";
    anim.style.top = "0px";
    anim.addEventListener("click", function () {
        document.getElementById("clickInfo").textContent = "SINGLE CLICK DETECTED";
        move(anim);}, false);
    anim.addEventListener("dblclick", function () {
        document.getElementById("clickInfo").textContent = "DOUBLE CLICK DETECTED";
        animate(anim)}, false);
});


var i = 0;
var move_id = 0;

function move(e) {
    // FLUENT ANIMATION
    e.style.position = "relative";
    var currentX = e.style.left.substr(0, e.style.left.length - 2);
    e.style.left = (parseInt(currentX) + (dx / 100)) + "px";
    var currentY = e.style.top.substr(0, e.style.left.length - 2);
    e.style.top = (parseInt(currentY) + (dy / 100)) + "px";
    if (++i < 100)
        move_id = window.setTimeout(function () {move(e);}, 10);
    else
        i = 0;

    // SINGLE FRAME
    // e.style.position = "relative";
    // var currentX = e.style.left.substr(0, e.style.left.length - 2);
    // e.style.left = parseInt(currentX) + dx + "px";
    // var currentY = e.style.top.substr(0, e.style.left.length - 2);
    // e.style.top = (parseInt(currentY) + dy) + "px";
}

var interval_id;
var timeout_id;
var isAnimated = false;

function animate(e) {
    isAnimated = !isAnimated;
    if (isAnimated){
        interval_id = window.setInterval(function () {move(e);},2500);
    }
    else if (!isAnimated){
        clearTimeout(move_id);
        clearInterval(interval_id);
    }
}




//for ... of loop
// for(var a of animatable){
//     a.addEventListener("click", move, false);
//     a.addEventListener("dblclick", animate, false);
// }

// e.onclick = function() {
//     timeout_id = setTimeout(move, 300);
// };
//
// e.ondblclick = function (){
//     clearTimeout(timeout_id);
//     animate();
// };