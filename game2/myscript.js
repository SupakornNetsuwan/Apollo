const fireButton = document.getElementsByName("fire")[0]
const showPosition = document.getElementById("show-position");

let position = {
    x: 100,
    y: -100
}

fireButton.addEventListener("click", () => {
    const getDeg = document.getElementsByName("input-degree")[0] // Get a degree
    const getForce = document.getElementsByName("input-force")[0] // get a force

    const spaceShip = document.getElementById("space-ship");

    const newPosition = (x, y, deg, force) => {
        const changeToRad = Number(deg) * (Math.PI / 180)
        const newX = x + (Number(force) * Math.cos(changeToRad))
        const newY = y + (Number(force) * Math.sin(changeToRad))

        return ({
            x: newX,
            y: newY
        })
    }

    position = newPosition(position.x, position.y, getDeg.value, getForce.value)
    spaceShip.style.left =  position.x + "px"
    spaceShip.style.top = -position.y + "px"
})