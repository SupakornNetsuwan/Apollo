// const allAnswer = [
//   {
//     p1: { x: 88.46761453396525, y: 39.02053712480253 },
//     p2: { x: 73.30173775671406, y: 21.958925750394943 },
//   },
//   {
//     p1: { x: 28.965517241379313, y: 9.137931034482758 },
//     p2: { x: 42.41379310344828, y: 21.379310344827587 },
//   },
//   {
//     p1: { x: 80.51724137931035, y: 42.931034482758626 },
//     p2: { x: 71.72413793103448, y: 47.41379310344828 },
//   },
//   {
//     p1: { x: 47.704918032786885, y: 19.01639344262295 },
//     p2: { x: 56.557377049180324, y: 27.704918032786885 },
//   },
// ];

const allGame = [
  {
    score: 0,
    found: 0,
    time: 119,
    img: {
      real: "./images/game1/real.png",
      fake: "./images/game1/fake.png",
    },
    answer: [
      {
        p1: { x: 33.94683026584867, y: 31.901840490797547 },
        p2: { x: 40.081799591002046, y: 37.83231083844581 },
        point: 25,
      },
      {
        p1: { x: 71.57464212678937, y: 39.87730061349693 },
        p2: { x: 74.23312883435584, y: 42.12678936605317 },
        point: 50,
      },
      {
        p1: { x: 53.78323108384458, y: 48.466257668711656 },
        p2: { x: 62.372188139059304, y: 57.873210633946826 },
        point: 25,
      },
      {
        p1: { x: 50.10224948875256, y: 73.21063394683026 },
        p2: { x: 41.922290388548056, y: 66.46216768916156 },
        point: 40,
      },
    ],
  },
  {
    score: 0,
    found: 0,
    time: 119,
    img: {
      real: "./images/game2/real.png",
      fake: "./images/game2/fake.png",
    },
    answer: [
      {
        p1: { x: 50.101010101010104, y: 32.323232323232325 },
        p2: { x: 56.36363636363636, y: 35.95959595959596 },
        point: 45,
      },
      {
        p1: { x: 32.323232323232325, y: 3.2323232323232323 },
        p2: { x: 42.62626262626263, y: 15.353535353535353 },
        point: 25,
      },
      {
        p1: { x: 39.39393939393939, y: 43.63636363636363 },
        p2: { x: 46.464646464646464, y: 51.717171717171716 },
        point: 25,
      },
      {
        p1: { x: 60.60606060606061, y: 87.07070707070706 },
        p2: { x: 64.84848484848484, y: 92.52525252525253 },
        point: 70,
      },
    ],
  },
];

const game5 = document.getElementById("game-5");
const startPage = game5.getElementsByClassName("startPage")[0];
const endPage = game5.getElementsByClassName("endGame")[0];
const gameArea = game5.getElementsByClassName("gameScreen")[0];
const board = game5.getElementsByClassName("gameBoard")[0];
const gameNum = game5.querySelector("#gameNum");

const scoreBoard = game5.querySelector("#score");
const timeBoard = game5.querySelector("#time");
const diffBoard = game5.querySelector("#diff");

const playBtn = game5.querySelector("#playBtn");
const realImg = game5.querySelector("#realImg");
const fakeImg = game5.querySelector("#fakeImg");
const circle = game5.getElementsByClassName("circle");

// const answer = [...allAnswer];
// let circleSize = 30;
let debug = false;

let nowGame = -1;
let score = 0;
let found = [];
let countDown = 0;
let started = false;

playBtn.addEventListener("click", startGame);
realImg.addEventListener("click", (e) => checkClick(e, realImg));
fakeImg.addEventListener("click", (e) => checkClick(e, fakeImg));
// updateBoard();
setInterval(counterDown, 1000);

function startGame() {
  startPage.classList.add("goUp");
  gameArea.classList.add("started");
  started = true;
  updateGame();
}

function endGame() {
  showDialog(false);
  setTimeout(() => {
    started = false;
    endPage.classList.remove("goUp");
  }, 250);
}

function restartGame() {
  showDialog(false);
  startPage.classList.remove("goUp");
  gameArea.classList.remove("started");
  for (let i = 0; i < circle.length; i++) circle[i].innerHTML = "";
  nowGame = -1;
  score = 0;
  found = [];
  countDown = 0;
  started = false;
}

function updateGame() {
  if (nowGame + 1 < allGame.length) {
    nowGame += 1;
    gameNum.innerHTML = nowGame + 1;
    realImg.src = allGame[nowGame].img.real;
    fakeImg.src = allGame[nowGame].img.fake;
    countDown = allGame[nowGame].time;
    score = 0;
    found = [];
    for (let i = 0; i < circle.length; i++) circle[i].innerHTML = "";
    updateBoard();
  } else console.log("end");
}

function updateBoard() {
  scoreBoard.innerHTML = `Score: ${score}`;
  diffBoard.innerHTML = `diff points ${found.length}/${allGame[nowGame].answer.length}`;
  timeBoard.innerHTML = `time: ${pad(Math.floor(countDown / 60))}.${pad(
    countDown % 60
  )}`;
}

function counterDown() {
  if (started) {
    if (countDown > 0) {
      countDown -= 1;
      updateBoard();
    } else if (
      countDown == 0 &&
      found.length != allGame[nowGame].answer.length
    ) {
      showDialog(
        true,
        "You lose",
        score,
        `${pad(Math.floor(countDown / 60))}.${pad(countDown % 60)}`,
        found.length,
        "Restart",
        restartGame
      );
    }
  }
}

function checkClick(e, img) {
  const { x, y } = GetCoordinates(e, img);
  const cirX = (x / img.width) * 100,
    cirY = (y / img.height) * 100;

  if (debug) console.log(cirX, cirY);

  const index = allGame[nowGame].answer.findIndex((ans) => {
    return (
      (ans.p1.x <= cirX &&
        cirX <= ans.p2.x &&
        ans.p1.y <= cirY &&
        cirY <= ans.p2.y) ||
      (ans.p1.x >= cirX &&
        cirX >= ans.p2.x &&
        ans.p1.y >= cirY &&
        cirY >= ans.p2.y)
    );
  });

  if (index != -1 && !found.includes(allGame[nowGame].answer[index])) {
    const width = Math.abs(
      allGame[nowGame].answer[index].p1.x - allGame[nowGame].answer[index].p2.x
    );
    const height = Math.abs(
      allGame[nowGame].answer[index].p1.y - allGame[nowGame].answer[index].p2.y
    );
    const centerX =
      (allGame[nowGame].answer[index].p1.x +
        allGame[nowGame].answer[index].p2.x) /
      2;
    const centerY =
      (allGame[nowGame].answer[index].p1.y +
        allGame[nowGame].answer[index].p2.y) /
      2;

    score += Math.ceil(allGame[nowGame].answer[index].point + (countDown / 10 * allGame[nowGame].answer[index].point));
    found.push(allGame[nowGame].answer[index]);

    for (let i = 0; i < circle.length; i++) {
      const circleResult = document.createElement("div");
      circleResult.classList.add("result");
      circleResult.style.setProperty("--width", `${width}%`);
      circleResult.style.setProperty("--centerY", `${centerY}%`);
      circleResult.style.setProperty("--centerX", `${centerX}%`);
      circle[i].appendChild(circleResult);
    }

    updateBoard();
    if (found.length == allGame[nowGame].answer.length) {
      setTimeout(() => {
        showDialog(
          true,
          "You win",
          score,
          `${pad(Math.floor(countDown / 60))}.${pad(countDown % 60)}`,
          found.length,
          nowGame + 1 < allGame.length ? "Next" : "End",
          nowGame + 1 < allGame.length ? nextGame : endGame
        );
      }, 250);
    }
  }
}

function nextGame() {
  showDialog(false);
  setTimeout(() => {
    updateGame();
  }, 250);
}

function showDialog(
  show = true,
  bigTxt = "You win/lose",
  point = 0,
  time = 0,
  found = 0,
  buttonTxt = "Button",
  clickBtn = () => console.log("click")
) {
  if (show) {
    started = false;
    const blurBG = document.createElement("div");

    const dialog = document.createElement("div");
    const detail = document.createElement("div");
    const nextBtn = document.createElement("button");
    const bigText = document.createElement("h1");
    const scoreText = document.createElement("h2");
    const timeText = document.createElement("h2");
    const foundText = document.createElement("h2");

    dialog.classList.add("winDialog");
    blurBG.classList.add("blurBG");

    bigText.innerText = bigTxt;
    nextBtn.innerText = buttonTxt;
    scoreText.innerText = `Score: ${point}`;
    timeText.innerText = `Time left: ${time}`;
    foundText.innerText = `Found: ${found}`;
    nextBtn.addEventListener("click", clickBtn);

    detail.appendChild(bigText);
    detail.appendChild(scoreText);
    detail.appendChild(timeText);
    detail.appendChild(foundText);
    detail.appendChild(nextBtn);

    dialog.appendChild(detail);

    game5.appendChild(blurBG);
    game5.appendChild(dialog);
  } else {
    const dialog = game5.getElementsByClassName("winDialog")[0];
    const blurBG = game5.getElementsByClassName("blurBG")[0];
    dialog.style.animationName = "centerToTop";
    blurBG.style.animationName = "fadeOut";
    setTimeout(() => {
      dialog.remove();
      blurBG.remove();
      started = true;
    }, 250);
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function FindPosition(oElement) {
  if (typeof oElement.offsetParent != "undefined") {
    for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
    return [posX, posY];
  } else {
    return [oElement.x, oElement.y];
  }
}

function GetCoordinates(e, img) {
  let PosX = 0;
  let PosY = 0;
  let ImgPos;
  ImgPos = FindPosition(img);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    PosX = e.pageX;
    PosY = e.pageY;
  } else if (e.clientX || e.clientY) {
    PosX =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    PosY =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  PosX = PosX - ImgPos[0];
  PosY = PosY - ImgPos[1];
  return { x: PosX, y: PosY };
}
