"use strict";

let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 30;
let highscore = 0;

const regenerateSecretNumber = function () {
  secretNumber = Math.floor(Math.random() * 30) + 1;
};

const setScore = function (newScore) {
  score = newScore;
  document.querySelector(".score").textContent = score;
};

const setHighscore = function (newHighscore) {
  highscore = newHighscore;
  document.querySelector(".highscore").textContent = highscore;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess || guess > 30 || guess < 0) {
    document.querySelector(".message").textContent = "❌ Unvalid number";
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "🥳 Correct Number!";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highscore) {
      setHighscore(score);
    }
  } else if (guess > secretNumber) {
    document.querySelector(".message").textContent = "👇 Try lower number!";
    setScore(--score);
  } else if (guess < secretNumber) {
    document.querySelector(".message").textContent = "☝️ Try higher number!";
    setScore(--score);
  }
});

document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  regenerateSecretNumber();
  setScore(30);
});
