const startGameButton = document.getElementsByClassName("game-button-wrapper")[0];

startGameButton.addEventListener("click", () => {
    const offScreen = document.getElementById("off-screen");
    const screenStatusLight = document.getElementById("screen-status-light");
    offScreen.classList.toggle("toggle")
    screenStatusLight.classList.toggle("toggle")

})