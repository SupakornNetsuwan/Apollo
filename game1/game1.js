const rocket = document.querySelector(".game-1 .rocketbox");
const duration = document.querySelector(".game-1 .duration");
const score_box = document.querySelector(".game-1 .score");
const max_fire = 6;
const game_speed = 10;
var time = 0;
var score = 0;
var fire_count = 0;
var stop;


function create_fire() {
  if (fire_count >= max_fire) {
    clearInterval(stop);
    document.querySelector(".endgame").style.display = "block";
    return;
  }
  var fire = document.createElement("img");
  fire.src = "./game1/game1fire.png";
  fire.style.position = "absolute";
  fire.className = "game-1-fire";
  fire.style.width = "20%";
  fire.style.top = Math.random() * 75 + 5 + "%";
  fire.style.left = Math.random() * 75 + 5 + "%";
  fire.style.animation = "spawnfire 0.5s ease-in-out forwards";
  fire.onclick = function () {
    if (fire_count >= max_fire) {
      return;
    }
    score += 1;
    fire_count -= 1;
    score_box.innerHTML = "Score: " + String(score).padStart(4, '0');
    this.remove();
  };
  fire_count += 1;
  rocket.appendChild(fire);
  setTimeout(create_fire, 2000 - Math.min(1900, time * game_speed));
}

function conv_time(sec) {
  var min = Math.floor(sec / 60);
  sec = sec % 60;
  return min + ":" + String(sec).padStart(2, '0');
}

function start(ctx) {
  if (!(ctx === undefined)) {
    ctx.parentElement.remove();
  }
  stop = setInterval(function () { time += 1; duration.innerHTML = "Duration: " + conv_time(time); }, 1000);

  setTimeout(create_fire, 1000);
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function restart() {
  time = 0;
  score = 0;
  fire_count = 0;
  removeElementsByClass("game-1-fire");
  duration.innerHTML = "Duration: 0:00";
  score_box.innerHTML = "Score: 0000";
  document.querySelector(".endgame").style.display = "none";
  start();
}
