"use strict";

//Trick Modal Selectors
const trick = document.querySelector(".trick");
const overlay = document.querySelector(".overlay");
const btnCloseTrick = document.querySelector(".close-trick");
const btnShowTrick = document.querySelector(".show-trick");

//Game Selectors
const numberSelector = document.querySelector(".number");
const guessSelector = document.querySelector(".guess");
const bodySelector = document.querySelector("body");
const checkSelector = document.querySelector(".check");
const againSelector = document.querySelector(".again");
const mainLableSelector = document.querySelector(".lable-main");

let secretNumber = generateSecretNumber();
let score = 30;
let highscore = 0;

function generateSecretNumber() {
  return Math.trunc(Math.random() * 30) + 1;
}

const display = function (selected, todisplay) {
  document.querySelector(`.${selected}`).textContent = todisplay;
};

const displayWinColors = function () {
  bodySelector.style.backgroundColor = "#60b347";
  numberSelector.style.cssText = `
    width: 30rem;
    border-radius: 25%;
  `;
};

const handleCorrectGuess = function () {
  display("message", "🥳 Correct Number!");
  display("number", secretNumber);
  displayWinColors();
  if (score > highscore) {
    if (highscore) {
      mainLableSelector.textContent = "🎉Congrats for a new Highscore🎉";
    }
    highscore = score;
    display("highscore", highscore);
  }
};

const handleWrongGuess = function (guess) {
  score--;
  display("score", score);
  if (score > 0) {
    display(
      "message",
      guess > secretNumber ? "👇 Try lower number!" : "☝️ Try higher number!"
    );
  } else {
    display("message", "😞 You lost the Game!");
  }
};

guessSelector.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkSelector.click();
  }
});

checkSelector.addEventListener("click", function () {
  const guess = Number(guessSelector.value);
  if (!guess || guess > 30 || guess < 0) {
    display("message", "❌ Invalid number");
  } else if (guess === secretNumber) {
    handleCorrectGuess();
  } else {
    handleWrongGuess(guess);
  }
});

const resetGameValues = function () {
  secretNumber = generateSecretNumber();
  score = 30;
  mainLableSelector.textContent = "Guess The Number!";
  bodySelector.style.backgroundColor = "#222";
  numberSelector.style.cssText = `
    width: 15rem;
    border-radius: 0%;
  `;
};

againSelector.addEventListener("click", function () {
  resetGameValues();
  display("score", score);
  display("number", "?");
  display("guess", "");
  display("message", "Start guessing...");
});

// Trick Modal
const showTrick = function () {
  trick.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeTrick = function () {
  trick.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShowTrick.addEventListener("click", showTrick);
btnCloseTrick.addEventListener("click", closeTrick);
overlay.addEventListener("click", closeTrick);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !trick.classList.contains("hidden")) {
    closeTrick();
  }
});
