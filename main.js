// const startGameButton = document.getElementsByClassName("game-button-wrapper")[0];

// startGameButton.addEventListener("click", () => {
//     const offScreen = document.getElementById("off-screen");
//     const screenStatusLight = document.getElementById("screen-status-light");
//     offScreen.classList.toggle("toggle")
//     screenStatusLight.classList.toggle("toggle")

// })

const sence01 = document.getElementById("sence01");
setTimeout(() => {
    //Show game 1
    sence01.style.display = "none";
}, 35000)

const game1Countinue = document.getElementsByClassName("game-1-continue")[0];
const sence03 = document.getElementsByClassName("sence03-wrapper")[0];
game1Countinue.addEventListener("click", () => {
    const sence02 = document.getElementsByClassName("sence02-wrapper")[0];
    sence02.style.zIndex = 100;
    console.log("Going for game2");

    setTimeout(() => {
        const game1 = document.getElementsByClassName("game-1")[0];
        game1.style.display = "none";
        sence02.style.display = "none";

        // const game4 = document.getElementById("game-4");
        // game4.style.display = "block";
        // game4.style.zIndex = 200;

        sence03.style.display = "block"
        sence03.style.zIndex = 100;
        console.log("Going for game3");
        setTimeout(() => {
            startGameNo3()
        }, 51000)
        //Now everything has hidden.
    }, 5000)
})

// const game4Done = document.getElementsByClassName("game-4-done")[0];
// // const sence03 = document.getElementsByClassName("sence03-wrapper")[0];
// game4Done.addEventListener("click", () => {
//     const game4 = document.getElementById("game-4");
//     game4.style.display = "none";

//     sence03.style.display = "block"
//     sence03.style.zIndex = 100;
//     console.log("Going for game3");
//     let time = 0;

//     // setTimeout(() => {
//     //     startGameNo3()
//     // }, 51000)
//     //Now everything has hidden.
// })

const game5Wrapper = document.getElementById("game-5");
const startGameNo3 = () => {
    console.log("START FINDING DIFF SPOT GAME.")
    sence03.style.display = "none";

    game5Wrapper.style.display = "flex";
}

const game5Done = document.getElementsByClassName("game-5-done")[0];
const sence04 = document.getElementsByClassName("sence04-wrapper")[0];
const sence05 = document.getElementsByClassName("sence05-wrapper")[0];

game5Done.addEventListener("click", () => {
    game5Wrapper.style.display = "none";
    sence04.style.display = "block";

    setTimeout(() => {
        sence04.style.display = "none";
        sence05.style.display = "block";

        setTimeout(() => {
            startGame3()
        }, 12000)
    }, 10000)
})

const startGame3 = () => {
    const sence05 = document.getElementsByClassName("sence05-wrapper")[0];
    sence05.style.display = "none";

    const game3start = document.getElementById("game-3");
    game3start.style.display = "block";

    const game3Done = document.getElementById("next_game3");
    game3Done.addEventListener("click", () => {
        game3start.style.display = "none";
        const sence06 = document.getElementsByClassName("sence06-wrapper")[0];
        sence06.style.display = "block";
        setTimeout(() => {
            sence06.style.display = "none";
            const game2Start = document.getElementById("game-2");
            game2Start.style.display = "block";
        }, 18000)
    })

}