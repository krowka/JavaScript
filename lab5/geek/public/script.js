var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var login = document.getElementById("login");
var loginType = "";
b1.addEventListener("click", () => {
    console.log("click b1");
    loginType = "student";
    // window.location.replace("http://localhost:3000/abc");
});

b2.addEventListener("click", () => {
    console.log("click b2");
    loginType = "teacher";
    // window.location.replace("http://localhost:3000/abc");
});

// login.addEventListener("click", () => {
//     console.log("login btn");
//     console.log(document.getElementById("defaultForm-email").value);
//     console.log(document.getElementById("defaultForm-pass").value);
// });

// Get the modal
var modal = document.getElementById("modal-wrapper");

b1.addEventListener("click", () => {
    console.log("click");
    modal.style.display = "block";
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};