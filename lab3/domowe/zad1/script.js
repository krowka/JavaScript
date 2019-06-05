var start_button = document.getElementById("start");
var stop_button = document.getElementById("stop");
var a = 0;
var result = 0;

var worker = new Worker("background.js");

worker.onmessage = function (event) {
    result = event.data;
};

function fibonacci(i) {
    i = parseInt(i);
    if(i == 0 || i == 1)
        return 1;
    else
        return fibonacci(i-2) + fibonacci(i-1);
}

//function's execution consumes a part of the interval
function funInterval(){
    var time = performance.now() - t0_interval;
    t0_interval = performance.now();
    //var fib =  fibonacci(++a);
    worker.postMessage('');
    document.getElementById("interval").innerHTML = `RESULT OF FUNCTION: ${result}` + "<br>" +
        `TIME: ${time}`;
}

// setTimeout guarantees the fixed (more less) delay
function funTimeout() {
    var time = performance.now() - t0_timeout;
    t0_timeout = performance.now();
    worker.postMessage('');
    document.getElementById("timeout").innerHTML = `RESULT OF FUNCTION: ${result}` + "<br>" +
        `TIME: ${time}`;
    timeout_id = setTimeout(funTimeout, 100);
}

function funRequest() {
    request_frequency++;
    worker.postMessage('');
    document.getElementById("request").innerHTML = `RESULT OF FUNCTION: ${result}`;
    if(performance.now() - t0_request >= 1000){
        document.getElementById("requestTime").innerHTML = "FREQUENCY: " + request_frequency;
        request_frequency = 0;
        t0_request = performance.now();
    }
    request_id = window.requestAnimationFrame(funRequest);
}

var interval_id;
var timeout_id;
var request_id;
var t0_interval = 0;
var t0_timeout = 0;
var t0_request = 0;
var request_frequency = 0;

start_button.onclick = function() {
    t0_interval = performance.now();
    interval_id = window.setInterval(funInterval, 100);

    t0_timeout = performance.now();
    funTimeout();

    t0_request = performance.now();
    funRequest();
};

stop_button.onclick = function() {
    window.clearInterval(interval_id);
    window.clearTimeout(timeout_id);
    window.cancelAnimationFrame(request_id);
};

var show_hide = document.getElementById("show_hide");

show_hide.onclick = function () {
    if (show_hide.textContent == "SHOW"){
        document.getElementById("description").textContent = "WITHOUT WORKER:";
        document.getElementsByTagName("img")[0].src = "img/withoutWorker.PNG";
        document.getElementsByTagName("img")[0].style.border = "2px solid black";
        document.getElementsByTagName("img")[0].style.borderRadius = "5px";
        show_hide.textContent = "HIDE";
    }
    else if (show_hide.textContent == "HIDE"){
        document.getElementById("description").textContent = "";
        document.getElementsByTagName("img")[0].src = "";
        document.getElementsByTagName("img")[0].style.border = "";
        document.getElementsByTagName("img")[0].style.borderRadius = "";
        show_hide.textContent = "SHOW";
    }
}