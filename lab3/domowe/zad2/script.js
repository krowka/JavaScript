function set() {
    document.getElementsByTagName("style")[0].innerHTML += ".azure { background-color: #EFF; } " +
        ".box { " +
        "border: 2px solid black; " +
        "box-shadow: 0px 0px 5px; " +
        "margin: 5mm;" +
        "padding: 3mm; " +
        "} " +
        "aside { " +
        "position: absolute; " +
        "top: 150px; right: 5px; " +
        "width: 50%; " +
        "} " +
        "footer { bottom: 5px; } " +
        "main { width: 420px; } " +
        "nav { width: 150px; } " +
        "body { min-width: 850px; }";

//     var box = document.getElementsByClassName("box");
//     for (var i = 0; i < box.length; i++) {
//         box[i].style.border = '2px solid black';
//         box[i].style.boxShadow = '0px 0px 5px';
//         box[i].style.margin = '5mm';
//         box[i].style.padding = '3mm';
//     }
//
//     var azure = document.getElementsByClassName("azure");
//     for (var i = 0; i < azure.length; i++) {
//         azure[i].style.backgroundColor = '#EFF';
//     }
//
//     var aside = document.getElementsByTagName("aside");
//     for (var i = 0; i < aside.length; i++) {
//         aside[i].style.position = 'absolute';
//         aside[i].style.top = '150px';
//         aside[i].style.right = '5px';
//         aside[i].style.width = '50%';
//     }
//
//     document.getElementsByTagName("footer")[0].style.bottom = '5px';
//     document.getElementsByTagName("main")[0].style.width = '420px';
//     document.getElementsByTagName("nav")[0].style.width = '150px';
//     document.getElementsByTagName("body")[0].style.minWidth = '850px';
 }

function reset() {

    document.getElementsByTagName("style")[0].innerHTML =
        ".button { width:10%; min-width: 100px; padding-bottom: 2px; padding-top: 2px; }" +
        "form { position: relative; width: 100%; padding-bottom: 20px; }" +
        "#set { position: absolute; left:10px; }" +
        "#reset { position: absolute; right:10px; }";

    // var box = document.getElementsByClassName("box");
    // for (var i = 0; i < box.length; i++) {
    //     box[i].style.border = '';
    //     box[i].style.boxShadow = '';
    //     box[i].style.margin = '';
    //     box[i].style.padding = '';
    // }
    //
    // var azure = document.getElementsByClassName("azure");
    // for (var i = 0; i < azure.length; i++) {
    //     azure[i].style.backgroundColor = 'white';
    // }
    //
    // var aside = document.getElementsByTagName("aside");
    // for (var i = 0; i < aside.length; i++) {
    //     aside[i].style.position = '';
    //     aside[i].style.top = '';
    //     aside[i].style.right = '';
    //     aside[i].style.width = '';
    // }
    //
    // document.getElementsByTagName("footer")[0].style.bottom = '';
    // document.getElementsByTagName("main")[0].style.width = '';
    // document.getElementsByTagName("nav")[0].style.width = '';
    // document.getElementsByTagName("body")[0].style.minWidth = '';
}

var set_btn = document.getElementById("set");
var reset_btn = document.getElementById("reset");

set_btn.onclick = set;
reset_btn.onclick = reset;
