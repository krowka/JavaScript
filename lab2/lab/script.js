var all_words = 0;
var all_lines = 0;
var length;
var words_of_given_length = 0;
var lines_with_given_word = 0;
var arr = [0,0,0,0,0,0,0,0,0,0];
var colors = ["red", "blue", "purple", "grey", "green", "yellow", "black", "orange", "pink", "navy"];
var button = document.getElementById("btn");

function drawCircleCut(ctx, start, angle, color, x , y, r, withStroke) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.arc(x, y, r, start, start + angle, false);
    ctx.lineTo(x, y);
    ctx.closePath();
    if(withStroke)
        ctx.stroke();
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
    return (start + angle);
}

function drawProgress(ctx, x, y, w, h, color, percent) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, percent * w, 50);
}

function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    drawCircleCut(ctx,0, 2*Math.PI, 'white', 900, 300, 250, true);

    var start = 0;
    for (var x = 0; x < arr.length; x++)
        start = drawCircleCut(ctx, start, (arr[x]/all_words) * 2 * Math.PI, colors[x], 900, 300, 250,false);

    if(length > 10)
        drawCircleCut(ctx, start,(words_of_given_length/all_words) * 2 * Math.PI, '#00FFFF', 900, 300, 250,false);

    drawProgress(ctx,50, 275, 500, 50, '#a7c0e7', lines_with_given_word/all_lines);


    ctx.fillStyle = "black";
    ctx.font = "20px Georgia";
    var percent = Math.round((lines_with_given_word/all_lines)*10000)/100;
    ctx.fillText(percent + "%",290,305);
    ctx.fillText("Ilość wystąpień danego słowa w stosunku do liczby wszystkich linii", 10, 370);
    ctx.fillText("Rozkład wszystkich słów ze względu na ich długości", 670, 580);
}

function howManyWords(word_length, words){
    var result = 0;
    for (var word of words) {
        if (word.length == parseInt(word_length)) {
            result++;
        }
    }
    return result;
}

function linesWithWord(word, lines){
    var lines_numbers = [];
    for (var i = 1; i <= lines.length; i++) {
        var words_in_line = lines[i - 1].split(/\s/);
        for (var j = 0; j < words_in_line.length; j++) {
            if (words_in_line[j] == word) {
                lines_numbers.push(i);
                lines_with_given_word++;
                break;
            }
        }
    }
    return lines_numbers.join(", ") + ".";
}



button.onclick = function () {
    var word = window.prompt("Podaj wyraz: ");
    length = window.prompt("Podaj dlugosc wyrazu: ");
    var text = "Szukane słowo: \"" + word + "\" występuje w liniach: ";
    var words = document.forms[0].elements[0].value.split(/\s/);
    all_words = words.length;
    var lines = document.forms[0].elements[0].value.split('\n');
    all_lines = lines.length;


    for (var v = 1; v < 11; v++) {
        arr[v-1] = howManyWords(v, words);
    }

    words_of_given_length = (length > 10) ? howManyWords(length, words) : arr[length-1];
    console.log(words_of_given_length);

    text += linesWithWord(word,lines);

    var word_form = "słów";
    if (words_of_given_length > 1 && words_of_given_length < 5)
        word_form = "słowa";
    else if (words_of_given_length == 1)
        word_form = "słowo"

    document.getElementById("output").innerHTML += "Znaleziono " + words_of_given_length + " " + word_form + " o zadanej długości: " + length + ".<br>";
    document.getElementById("output").innerHTML += text + "<br>";
    draw();
    var text = `<b><div class="color-box" style = "background: #00FFFF"></div>` +
        `<div class='description'>- ilość wystąpień szukanego słowa, którego liczba znaków wynosi: ${length}</div></b><br>`;

    for(var a = 0; a < colors.length; a++){
        var tmp = `<div class="color-box" style = "background: ${colors[a]}"></div>` +
            `<div class='description'>- ilość wystąpień słowa, którego liczba znaków wynosi: ${a+1}</div><br>`;

        if(length == a+1){
            tmp = `<b><div class="color-box" style = "background: ${colors[a]}"></div>` +
                `<div class='description'>- ilość wystąpień szukanego słowa, którego liczba znaków wynosi: ${a+1}</div></b><br>`;
        }

        document.getElementById("legenda").innerHTML += tmp;
    }
    if(length > 10){
        document.getElementById("legenda").innerHTML += text;
    }

    document.getElementById("legenda").innerHTML += `<div class="color-box" style = "background: white"></div>` +
        `<div class='description'>- ilość wystąpień pozostałych słów</div> <br>`

}