var count = 30000;
var number = 1;
var bonus = false;
var point = 0;


var index = 0
var canvas = document.getElementsByClassName('game-dots')[0];
var context = canvas.getContext('2d');

canvas.width  = 1200;
canvas.height = 600;
var imageObj = new Image();


document.getElementById("stageNum").innerHTML = index+1 +"/2";
canvas.addEventListener('mousedown', function(e) {
    checkDots(e);
    console.log(e);
});
// ----------------- เกี่ยวกับเกม(สร้างรูป)
var data1 = {
    dots:[{x: 521, y: 96}, {x: 522, y: 256}, {x: 572, y: 341}, {x: 474, y: 374},
        {x: 460, y: 458}, {x: 480, y: 475},{x: 492, y: 560}, {x: 710, y:560}
        ,{x: 720, y: 476}, {x: 740, y: 458}, {x: 724, y: 364}, {x: 626, y: 339},
        {x: 675, y: 257}, {x: 674, y: 96}, {x: 521, y: 96}]
};
var data2 = {
    dots:[{x: 508, y: 262}, {x: 462, y: 234}, {x: 443, y:256}, {x: 506 ,y:337}, {x: 517, y:463}, {x: 505, y: 504},
        {x: 561, y: 506}, {x: 574, y: 444}, {x:588, y:507}, {x: 628, y:508}, {x: 646, y:457}, {x: 666, y:462},
        {x: 704, y: 446}, {x: 702, y:340}, {x: 672, y:312}, {x: 691, y:271}, {x: 676, y:196},
        {x: 620, y: 155}, {x: 542, y: 169}, {x:513, y:208}, {x:508, y:262}]
};
var index = 0
var stage = [data1, data2]

function drawDots(){
    let i = 0;
    for (; i <stage[index].dots.length; i++){
        let d = stage[index].dots[i];
        context.beginPath();
        context.arc(d.x, d.y, 6, 0, 2*Math.PI);
        context.fillStyle = 'white' ;
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(d.x, d.y, 4, 0, 2*Math.PI);
        context.fillStyle = 'black' ;
        context.fill();
        context.closePath();  
    }
    writeNumber();
}

function writeNumber(){

    var i = 1;
    for (; i <stage[index].dots.length; i++){
        let d = stage[index].dots[i];
        context.fillStyle = "white";
        context.font = "15px Arial";
        context.fillText(i, d.x-5, d.y+25);
    }
    setTimeout(clearNum, 3000);
    
}

function clearNum(){
    var i = 1;
    for (; i <stage[index].dots.length; i++){
        let d = stage[index].dots[i];
        context.fillStyle = "black";
        context.font = "17px Arial";
        context.fillText("▇", d.x-5, d.y+25);
        
    }
}


// ----------------- เกี่ยวกับเกม(การกด)
function checkDots(e){
    if(number === stage[index].dots.length-1){
        end();
    }
    let col = null;
    let d = stage[index].dots[number],
        c1 = {x: d.x, y: d.y, r:20};
        c2 = {x: e.layerX, y: e.layerY, r:20};
    if(circleCollision (c1, c2)){
        col = d;
        if(bonus == true){
          point += number*2*5;  
        }
        else{
            point += number*5;
        }
        
    }
    if(col !== null){
        drawLine(col);
    }
}
function circleCollision (c1, c2) {
    let a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;
        console.log(c1, c2);
    if ( a > Math.sqrt( (x*x) + (y*y) ) ) return true;
    else{
        life();
        return false;
    } 
}
function drawLine (toDot){
    context.beginPath();
    context.moveTo(stage[index].dots[number-1].x, stage[index].dots[number-1].y);
    context.lineTo(toDot.x, toDot.y);
    context.lineWidth = 5;
    context.strokeStyle = '#bffdbf';
    context.stroke();
    context.closePath();
    number++;
}
// ----------------- ตัวช่วย
var modalLose = document.getElementsByClassName("modalLose")[0];
var lose = document.getElementsByClassName("lose")[0];

var numlife = 4
function life(){
    numlife--;
    if (numlife == 3){
        document.getElementsByClassName("life1")[0].style.color = "red";
    }
    else if (numlife == 2){
        document.getElementsByClassName("life2")[0].style.color = "red";
    }
    else if (numlife == 1){
        document.getElementsByClassName("life3")[0].style.color = "red";
    }
    else if (numlife == 0){
        modalLose.style.display = "block";
        lose.onclick = function(){
            modalLose.style.display = "none";
            restart();
        }

    }
}

function losegame(){
    modalLose.style.display = "block";
    lose.onclick = function(){
        modalLose.style.display = "none";
        restart();
    }
};
function x2(){
    bonus = true;
    document.getElementsByClassName("steaksFire")[0].style.opacity = "1";
    document.getElementsByClassName("x2point")[0].style.opacity = "0";
    document.getElementsByClassName("circlex2")[0].style.display = "block";
}
function restartTime(){
    document.getElementsByClassName("circletimeblock")[0].style.display = "block";
    document.getElementsByClassName("pie")[0].style.opacity = "1";
    var test = document.querySelector(".name");
    test.classList.remove("pie");
    setTimeout(() => {
        test.classList.add("pie");
    }, 100);
    clearTimeout(time);
    time = setTimeout(() => {
        losegame();
    }, 30500);
    

};

function answer(){
    writeNumber();
    document.getElementsByClassName("answer")[0].style.opacity = "0";
    document.getElementsByClassName("circleanswer")[0].style.display = "block";
}




// ----------------- start end restart


function newlife(){
    document.getElementsByClassName("life1")[0].style.color = "White";
    document.getElementsByClassName("life2")[0].style.color = "White";
    document.getElementsByClassName("life3")[0].style.color = "White";
}

function restart(){

    context.clearRect(0, 0, canvas.width, canvas.height); 
    numlife = 4;
    newlife();
    index = 0;
    drawDots();
    number = 1;
    point = 0;
    bonus = false
    document.getElementById("stageNum").innerHTML = index+1 +"/2";
    document.getElementsByClassName("steaksFire")[0].style.opacity = "0.1";
    modal.style.display = "block";
    document.getElementsByClassName("x2point")[0].style.opacity = "1";
    document.getElementsByClassName("circlex2")[0].style.display = "none";
    document.getElementsByClassName("answer")[0].style.opacity = "1";
    document.getElementsByClassName("circleanswer")[0].style.display = "none";
    clearTimeout(time);
    time = setTimeout(() => {
    losegame();
    }, 30500);
    document.getElementsByClassName("circletimeblock")[0].style.display = "none";
    var test = document.querySelector(".name");
    test.classList.remove("pie");
    setTimeout(() => {
        test.classList.add("pie");
    }, 100);
}

function updategame(){
    clearTimeout(time);
    context.clearRect(0, 0, canvas.width, canvas.height); 
    index++;
    drawDots();
    number = 1;
    bonus = false
    document.getElementById("stageNum").innerHTML = index+1 +"/2";
    document.getElementsByClassName("steaksFire")[0].style.opacity = "0.1";
    var test = document.querySelector(".name");
    test.classList.remove("pie");
    setTimeout(() => {
        test.classList.add("pie");
    }, 100);
    time = setTimeout(() => {
        losegame();
    }, 30500);
    
}

var modalnext = document.getElementsByClassName("modalnext")[0]; 
var next = document.getElementsByClassName("next")[0];
var modalend = document.getElementsByClassName("modalend")[0];
var modalscore = document.getElementsByClassName("modalscore")[0];
var score = document.getElementsByClassName("score")[0];
function end(){
    if (index == 1){
        clearTimeout(time);
        imageObj.onload = function() {
            context.drawImage(imageObj, 260, -40,);
        };
        imageObj.src = 'spaceman.png';
        setTimeout(function(){
            document.getElementsByClassName("showpoint")[0].innerHTML = point;
    
            modalend.style.display = "block";
        }, 1000);
        


        

    }
    if (index == 0){
        modalnext.style.display = "block";
        next.onclick = function(){
            modalnext.style.display = "none";
            updategame();
            
        }
    
}
}




var modal = document.getElementsByClassName("modalstart")[0];
var start = document.getElementsByClassName("start")[0];
var modaloption = document.getElementsByClassName("modaloption")[0];
var option = document.getElementsByClassName("optionbutton")[0];


start.onclick = function() {
  modal.style.display = "none";
  modaloption.style.display = "block";
}

option.onclick = function(){
    modaloption.style.display = "none";
    drawDots();

    time = setTimeout(() => {
    losegame();
}, 30500);
}







