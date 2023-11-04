"use strict";

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
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.cssText = `
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
      document.querySelector("header > h1").textContent =
        "🎉Congrats for a new Highscore🎉";
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

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
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
  document.querySelector("header > h1").textContent = "Guess The Number!";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.cssText = `
    width: 15rem;
    border-radius: 0%;
  `;
};

document.querySelector(".again").addEventListener("click", function () {
  resetGameValues();
  display("score", score);
  display("number", "?");
  display("guess", "");
  display("message", "Start guessing...");
});
