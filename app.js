let gameseq = [];
let userseq = [];
let started = false;
let h2 = document.querySelector("h3");
let level = 0;
let highScore = 0;
let btns = ["yellow", "red", "purple", "green"];

document.addEventListener("keydown", function () {
  if (!started) {
    started = true;
    gameseq = [];
    userseq = [];
    level = 0;
    levelup();
  }
});

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 600);
    }
  } else {
    if (level - 1 > highScore) {
      highScore = level - 1;
    }

    h2.innerHTML = `❌ Game Over! <br>✅ Your Score: <b>${
      level - 1
    }</b> <br>🏆 High Score: <b>${highScore}</b> <br>Press any key to restart`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
  }
}

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `🟢 Level ${level} | 🏆 High Score: ${highScore}`;
  let random = Math.floor(Math.random() * 4);
  let randColor = btns[random];
  let randBtn = document.querySelector(`.${randColor}`);
  btnflash(randBtn);
  playSound(randColor);
  gameseq.push(randColor);
  console.log("Game Sequence:", gameseq);
}

function btnpress() {
  if (!started) return;
  let btn = this;
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  btnflash(btn);
  playSound(userColor);
  checkans(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
  btn.addEventListener("click", btnpress);
}
