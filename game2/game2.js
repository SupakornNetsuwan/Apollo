const fireButton = document.getElementsByName("fire")[0]
const showPosition = document.getElementById("show-position");
const restartButton = document.getElementById("restart-button");

const spaceShip = document.getElementById("space-ship");
const getDeg = document.getElementsByName("input-degree")[0] // Get a degree
const getForce = document.getElementsByName("input-force")[0] // get a force
//Decrease fuel on every fire
const currentFuel = document.getElementById("current-fuel");

let position = {
    x: 100,
    y: -100
}

let availableFuel = 140

const startgame = document.getElementById("playBtn-game2");
const dialogGame2 = document.getElementsByClassName("goUp-game-2")[0];
const dialogGame2Detail = document.getElementsByClassName("detail-game-2")[0];
let finishEntireGame = false

startgame.addEventListener("click", () => {
    dialogGame2.style.display = "none";

    if(finishEntireGame === true){
        const finishEntireGameDialog = document.getElementsByClassName("finish-entire-game")[0];
        finishEntireGameDialog.style.display = "flex";
    }

    finishEntireGame = true;

})

restartButton.addEventListener("click", () => {
    spaceShip.style.left = "100px"
    spaceShip.style.top = "100px"
    currentFuel.style.width = "100%"
    position = {
        x: 100,
        y: -100
    }
    availableFuel = 140
})

const newPosition = (x, y, deg, force) => {
    const changeToRad = Number(deg) * (Math.PI / 180)
    const newX = x + (Number(force) * Math.cos(changeToRad))
    const newY = y + (Number(force) * Math.sin(changeToRad))

    console.log({ x, y })
    return ({
        x: newX,
        y: newY
    })
}

const checkVictory = ({ x, y }) => {
    //Test for victory position
    // const victoryPlanet = document.getElementsByClassName("victory-planet")[0];

    if ((x >= 1050 && x <= 1650) && (y <= -250 && y >= -850)) {

        dialogGame2.style.display = "flex";
        dialogGame2Detail.innerHTML = `เก่งมาก! คุณกลับมายังโลกได้สำเร็จ <br>
        รู้ไหมว่าตอนอพอลโล 13 ก็ได้เกิดอุบัติเหตุขึ้น คือถังออกซิเจนเกิดระเบิดขึ้นมา แต่ตัวยานนั้นอยู่ห่างจากโลกเกินกว่าจะกลับได้ พวกเขาเลยใช้วิธี Free-return trajectory ซึ่งก็คือการใช้แรงดึงดูดของดวงจันทร์เหวี่ยงยานกลับสู่โลก การศึกษาเรื่องเก่าๆไว้ก็ดีเหมือนกัน? ว่างๆ ระหว่างกลับโลกก็มาศึกษากันเถอะ
        `;
        const titleGame2 = document.getElementsByClassName("title-game2")[0];
        titleGame2.innerHTML = "ภารกิจสำเร็จ"
        //Play next level!
    }
}

fireButton.addEventListener("click", () => {
    spaceShip.style.transform = `rotate(${-1 * parseInt(getDeg.value)}deg)`

    if (availableFuel - Math.abs(Number(getForce.value / 10)) <= 0) {
        let direction = getForce.value < 0 ? -1 : 1;
        const lastPower = availableFuel * 10 * direction;

        position = newPosition(position.x, position.y, getDeg.value, lastPower)
        spaceShip.style.left = position.x + "px"
        spaceShip.style.top = -position.y + "px"
        checkVictory(position);

        availableFuel = 0
        currentFuel.style.width = availableFuel + "%"
    } else {
        availableFuel -= Math.abs(Number(getForce.value / 10))
        currentFuel.style.width = availableFuel + "%"

        position = newPosition(position.x, position.y, getDeg.value, getForce.value)
        spaceShip.style.left = position.x + "px"
        spaceShip.style.top = -position.y + "px"
        checkVictory(position);
    }


})