const mainArea = document.querySelector("#main-area");
const ballArea = document.querySelector('#ball-area');
const menu = document.querySelector('.menu');
const scoreArea = document.querySelector("#score");
const highScoreArea = document.querySelector("#high-score");
const timerArea = document.querySelector("#timer");
const playAgainArea = document.querySelector("#play-again");
const playAgainButton = playAgainArea.querySelector("button");
const levelsButtons = document.querySelectorAll(".level");
let score = 0;
let highScore = 0;
let interval = 0;
let timer = 90;
let number = 0;

function handleClick(obj) {
    if (timer > 0 && number < 200) {
        ballArea.removeChild(obj);
        score = score + 1;
        number = number - 1;
    
        const oldScore = scoreArea.querySelector('span');
    
        scoreArea.removeChild(oldScore);
        const span = document.createElement("span");
        span.innerHTML = score;
        scoreArea.appendChild(span);
    }
}

function start(level) {
    let levelInterval = 1000;
    
    if (level === 'medium') {
        levelInterval = 500;
    } else if (level === 'hard') {
        levelInterval = 100;
    } else if (level === 'insane') {
        levelInterval = 0.1;
    }

    const introductionArea = mainArea.querySelector(".introduction");
    introductionArea.style.display = 'none';
    const colours = [
        "#FF0000",
        "#FFFF00",
        "#0000FF",
        "#ff7600",
        "#3949ab",
        "#9c27b0",
        "#23AD23",
        "#4FFF30",
        "#ff99f0"
    ]
    menu.style.visibility = 'visible';

    const clock = setInterval(() => {
        if (timer < 1 || number > 200) {
            if (score > highScore) {
                const highScoreSpan = highScoreArea.querySelector("span");
                highScore = score;
                highScoreSpan.innerHTML = `${score}`;
            }
            console.log(number);
            playAgainArea.style.display = 'block';
            clearInterval(interval);
            clearInterval(clock);
            return;
        } else {
            timer = timer - 1;
            const oldTimer = timerArea.querySelector("span");
            timerArea.removeChild(oldTimer);
            const span = document.createElement("span");
            span.innerHTML = `${timer} seconds`;
            timerArea.appendChild(span);
        }
    }, 1000);
    
    interval = setInterval(() => {
        if (timer > 0 || number > 200) {
            const node = document.createElement("div");
            node.classList.add('ball');
            node.style.left = `${Math.floor(Math.random(10) * (window.innerWidth - 100))}px`;
            node.style.top = `${Math.floor(Math.random(10) * (window.innerHeight - 150))}px`;
    
            node.setAttribute("onclick", `handleClick(this)`)
            const index = Math.floor(Math.random(10) * 9);
            node.style.backgroundColor = colours[index];
    
            ballArea.appendChild(node);
            number += 1;
        } else {
            return
        }

    }, levelInterval);
}

function setBackground(level) {
    const main = document.querySelector('main');
    const levels = document.querySelector('.levels');
    const buttons = levels.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.color = '#000000';
        button.style.fontSize = '32px';
    });    

    if (level === 'easy') {
        main.style.backgroundColor = '#FF00FF';
        main.style.color = '#000000';
        levelsButtons.forEach((button) => button.style.color = '#000000');
        const button = document.querySelector("#easy");
        button.style.color = "#FFFF00";
        menu.style.color = '#000000';
        playAgainButton.style.color = '#000000'
    } else if (level === 'medium') {
        main.style.backgroundColor = '#eeee00'
        main.style.color = '#000000';
        levelsButtons.forEach((button) => button.style.color = '#000000');
        const button = document.querySelector("#medium");
        button.style.color = "#FF00FF";
        menu.style.color = '#000000';
        playAgainButton.style.color = '#000000'
    } else if (level === 'hard') {
        main.style.backgroundColor = '#c53030';
        main.style.color = '#000000';
        levelsButtons.forEach((button) => button.style.color = '#000000');
        const button = document.querySelector("#hard");
        button.style.color = "#FFFFFF";
        menu.style.color = '#000000';
        playAgainButton.style.color = '#000000'
    } else {
        main.style.backgroundColor = '#000000';
        main.style.color = '#c53030';
        playAgainButton.style.color = "#c53030";
        levelsButtons.forEach((button) => button.style.color = '#c53030');
        const button = document.querySelector("#insane");
        button.style.color = "#660000";
        menu.style.color = '#c53030';
    }
}

function playAgain() {
    ballArea.innerHTML = "";
    const introduction = mainArea.querySelector(".introduction");
    playAgainArea.style.display = 'none';
    introduction.style.display = 'block';
    menu.style.visibility = 'hidden';
    score = 0;
    const oldScore = scoreArea.querySelector('span');
    scoreArea.removeChild(oldScore);
    const span = document.createElement("span");
    span.innerHTML = score;
    scoreArea.appendChild(span);
    number = 0;
    timer = 90;
    const oldTimer = timerArea.querySelector("span");
    timerArea.removeChild(oldTimer);
    const timerSpan = document.createElement("span");
    timerSpan.innerHTML = `${timer} seconds`;
    timerArea.appendChild(timerSpan);
}