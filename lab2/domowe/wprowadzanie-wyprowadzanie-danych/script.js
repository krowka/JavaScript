// console.log('Tekst 1');
// window.alert('Tekst 2');
// document.write('Tekst 3');

var x = window.prompt("Tekst 1", "Tekst 2");
document.getElementById("typeof1").innerHTML = "typeof " + x + " to " + (typeof x);

var button = document.getElementById("btn");

// button.onclick = function () {
//     var y = document.forms[0].elements[0].value;
//     document.getElementById("typeof2").innerHTML = "typeof " + y + " to " + typeof y;
//     document.getElementById("form").innerHTML = y;
//     //   document.getElementById("form").innerHTML = document.forms['formularz'].elements['pole_tekstowe'].value;
// };

function myFunction() {
    document.getElementById("form").innerHTML += document.forms[0].elements[0].value + "<br>";
}

button.onclick = myFunction;
