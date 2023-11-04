"use strict";

let secretNumber = generateSecretNumber();
let score = 30;
let highscore = 0;

function generateSecretNumber() {
  return Math.trunc(Math.random() * 30) + 1;
}

const displayMessage = function (toDisplayMessage) {
  document.querySelector(".message").textContent = toDisplayMessage;
};

const displayWinColors = function () {
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.cssText = `
    width: 30rem;
    border-radius: 25%;
  `;
};

const handleCorrectGuess = function () {
  displayMessage("🥳 Correct Number!");
  document.querySelector(".number").textContent = secretNumber;
  displayWinColors();
  if (score > highscore) {
    highscore = score;
    document.querySelector(".highscore").textContent = highscore;
  }
};

const handleWrongGuess = function (guess) {
  score--;
  document.querySelector(".score").textContent = score;
  if (score > 0) {
    displayMessage(
      guess > secretNumber ? "👇 Try lower number!" : "☝️ Try higher number!"
    );
  } else {
    displayMessage("😞 You lost the Game!");
  }
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess || guess > 30 || guess < 0) {
    displayMessage("❌ Invalid number");
  } else if (guess === secretNumber) {
    handleCorrectGuess();
  } else {
    handleWrongGuess(guess);
  }
});

const resetGameValues = function () {
  secretNumber = generateSecretNumber();
  score = 30;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.cssText = `
    width: 15rem;
    border-radius: 0%;
  `;
};

document.querySelector(".again").addEventListener("click", function () {
  resetGameValues();
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  displayMessage("Start guessing...");
});
