var scoreGame3 = 0

function startGame3kub() {
    var start = document.querySelector("#start");
    start.dataset.start = "1";
    invisible_wall.dataset.start = "1";
    // playoff.dataset.start = "1";
    // start.innerHTML = "?";
    // playoff.innerHTML = "<center>?</center>";
    htp.dataset.start = "1"
    setTimeout(function() {document.querySelector("#htp").style = "transition: background-color .3s;";},2200);
    console.log("start!");
}

function win() {
    console.log("you win");
    document.querySelector("#box_hint").style = "display: none;";
    document.querySelector("#card_hint").style = "display: none;";
    document.querySelector("#pipe_hint").style = "display: none;";
    document.querySelector("#suit_hint").style = "display: none;";
    document.querySelector("#tape_hint").style = "display: none;";
    document.querySelector("#hint_bar").style = "bottom: -10%; transition: 1s;";
    document.querySelector("#htp").style = "opacity: 0; transition: 2s; visibility: hidden;";
    var box = document.querySelector("#box");
    var card = document.querySelector("#card");
    var pipe = document.querySelector("#pipe");
    var suit = document.querySelector("#suit");
    var tape = document.querySelector("#tape");
    var lhc_hm = document.querySelector("#lhc_hm");
    box.dataset.find = "2";
    card.dataset.find = "2";
    pipe.dataset.find = "2";
    suit.dataset.find = "2";
    tape.dataset.find = "2";
    setTimeout(function() {lhc_hm.dataset.win = "1";
                        win_main.dataset.win = "1";
                        win_text.dataset.win = "1";
                        next_game3.dataset.win = "1";
                        invisible_wall_end.dataset.win = "1";},1500);

}

/* เช็คว่ากดไปหรือยัง */

var isbox = 1;
var iscard = 1;
var ispipe = 1;
var issuit = 1;
var istape = 1;

/* item */

function box() {
    var box = document.querySelector("#box");
    box.dataset.find = "1";
    box_hint.dataset.find = "1";
    if (isbox == 1){
        scoreGame3++;
        isbox = 0;
        console.log(scoreGame3);
    }
    if (scoreGame3 >= 5){
        setTimeout(function() {win()},1000);
    }
}

function card() {
    var card = document.querySelector("#card-dup");
    card.dataset.find = "1";
    card_hint.dataset.find = "1";
    if (iscard == 1){
        scoreGame3++;
        iscard = 0;
        console.log(scoreGame3);
    }
    if (scoreGame3 >= 5){
        setTimeout(function() {win()},1000);
    }
}

function pipe() {
    var pipe = document.querySelector("#pipe");
    pipe.dataset.find = "1";
    pipe_hint.dataset.find = "1";
    if (ispipe == 1){
        scoreGame3++;
        ispipe = 0;
        console.log(scoreGame3);
    }
    if (scoreGame3 >= 5){
        setTimeout(function() {win()},1000);
    }
}

function suit() {
    var suit = document.querySelector("#suit");
    suit.dataset.find = "1";
    suit_hint.dataset.find = "1";
    if (issuit == 1){
        scoreGame3++;
        issuit = 0;
        console.log(scoreGame3);
    }
    if (scoreGame3 >= 5){
        setTimeout(function() {win()},1000);
    }
}

function tape() {
    var tape = document.querySelector("#tape");
    tape.dataset.find = "1";
    tape_hint.dataset.find = "1";
    if (istape == 1){
        scoreGame3++;
        istape = 0;
        console.log(scoreGame3);
    }
    if (scoreGame3 >= 5){
        setTimeout(function() {win()},1000);
    }
}
