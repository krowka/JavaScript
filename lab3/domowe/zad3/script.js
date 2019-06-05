var c = 10;

var n = prompt("Enter amount of spans", '100');
createSpans(n == null ? 20 : parseInt(n));

function createSpans(n) {
    for (var i = 0; i < n; i++) {
        document.getElementById("x").innerHTML += "<span class = 'span'>10</span>";
    }
}

function decrement() {
    //var spans = document.getElementsByTagName("span");
    var spans = document.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
        if (c >= 0){
            spans[i].textContent = c;
            //document.getElementById("counter").value = c;
        }
        else {
            document.getElementById("counter").value = 0;
        }
    }
    c--;
}

var button = document.getElementById("run");

button.onclick = function () {
    c = document.getElementById("counter").value;
    setInterval(decrement, 1000)
};