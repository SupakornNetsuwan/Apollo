const fireButton = document.getElementsByName("fire")[0]
const showPosition = document.getElementById("show-position");

let position = {
    x: 100,
    y: -100
}

let availableFuel = 120

const newPosition = (x, y, deg, force) => {
    const changeToRad = Number(deg) * (Math.PI / 180)
    const newX = x + (Number(force) * Math.cos(changeToRad))
    const newY = y + (Number(force) * Math.sin(changeToRad))

        console.log({x, y})
    return ({
        x: newX,
        y: newY
    })
}

const checkVictory = ({x, y}) => {
    //Test for victory position
    // const victoryPlanet = document.getElementsByClassName("victory-planet")[0];

    if((x >= 1060 && x <= 1260) && ( y <= -130 && y >= -420)){
        alert("Victory!")
    }
}

fireButton.addEventListener("click", () => {
    const getDeg = document.getElementsByName("input-degree")[0] // Get a degree
    const getForce = document.getElementsByName("input-force")[0] // get a force
    const spaceShip = document.getElementById("space-ship");
    //Decrease fuel on every fire
    const currentFuel = document.getElementById("current-fuel");

    
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