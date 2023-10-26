"use strict";

let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 30;
let highscore = 0;

const setGameValues = function () {
  secretNumber = Math.floor(Math.random() * 30) + 1;
  score = 30;
};

const displayMessage = function (toDisplayMessage) {
  document.querySelector(".message").textContent = toDisplayMessage;
};

const handleCorrectGuess = function () {
  displayMessage("🥳 Correct Number!");
  document.querySelector(".number").textContent = secretNumber;
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

document.querySelector(".again").addEventListener("click", function () {
  setGameValues();
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
});
