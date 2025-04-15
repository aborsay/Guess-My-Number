'use strict';

/**
 * 1) Create Random number
 * 2) Check Answer
 * 3) Store Answer
 * 4) 

*/

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'frog';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;
// document.querySelector('.guess').value = 45;
let score = 20;
let highscore = 0;
let usedNumbers = new Map();
let randomNumber = 0;
let currentGuessedNumbers = new Array();

/**
 *
 * @returns Creates the Random Number that will be refreshed on each page load
 */
function createRandomNumber() {
  let rn = Math.trunc(Math.random() * 20) + 1;

  if (usedNumbers.size != 0) {
    while (usedNumbers.has(rn) && usedNumbers.size < 15) {
      rn = Math.trunc(Math.random() * 21) + 1;
    }
  }
  if (usedNumbers.size > 0 && usedNumbers.has(rn)) {
    usedNumbers.set(rn, usedNumbers.get(rn) + 1);
  } else {
    usedNumbers.set(rn, 1);
  }
  console.log(rn);
  return rn;
}

/**
 * This function save current guessed number to list and sorts the list
 * from smallest to greatest
 * @param {*} guessedNumber
 */
function saveCurrentGuess(guessedNumber) {
  if (!currentGuessedNumbers.includes(guessedNumber)) {
    currentGuessedNumbers.push(guessedNumber);
    currentGuessedNumbers.sort(function (a, b) {
      return a - b;
    });
  }
}

/**
 *
 * @returns the html holding the list of guessed numbers
 */
const listOfGuessedNumbers = () =>
  `<div class="guess-list">📃 ${currentGuessedNumbers.toString()}</div>`;

/**
 * This fucntion display the message if the guess is incorrect and if the guessed number
 * is higher or lower then the correct number and prints the list of currently guess numbers
 * @param {*} guessedNumberIsLarger
 */
function displayIncorrectGuess(guessedNumberIsLarger) {
  let guessMessage = '<div class="incorrect">😭 INCORRECT</div>';
  guessMessage += `<div class="high-or-low"> ${
    guessedNumberIsLarger ? '🚀 Too High' : '⚓ Too Low'
  }</div>`;
  guessMessage += listOfGuessedNumbers();

  document.querySelector('.message').innerHTML = guessMessage;
}

/**
 * Displays the message if the correct guess was made
 * @param {*} guessedNumber
 */
function displayCorrectGuess(guessedNumber) {
  document.querySelector('.number').textContent = guessedNumber;
  let guessMessage = `<div class="correct">🥳 ${guessedNumber} is Correct!!!</div>`;
  guessMessage += listOfGuessedNumbers();

  document.querySelector('.message').innerHTML = guessMessage;
}

/**
 * clears the input box of the guessed number
 */
const clearGuessedNumber = () => {
  document.querySelector('.guess').value = '';
};

/**
 *
 * @returns Clears the list of currently guessed numbers
 */
const clearCurrentGuesses = () =>
  currentGuessedNumbers.splice(0, currentGuessedNumbers.length);

/**
 * Checks if the user has guess the correct random number or not
 * and then does actions based upon if it is correct on not.
 * Also checks if the score is 0 and if so the user has lost
 * the game.
 * @param {*} guessedNumber
 */
function checkGuess(guessedNumber) {
  clearGuessedNumber();
  if (guessedNumber === randomNumber) {
    displayCorrectGuess(guessedNumber);
    listHighScore();
    buttonDisplays(true);
  } else {
    saveCurrentGuess(guessedNumber);
    reduceScore();
    displayIncorrectGuess(guessedNumber > randomNumber ? true : false);
  }

  if (score == 0) {
    document.querySelector('.message').innerHTML = '☠️ You Have Lost the Game';
    buttonDisplays(true);
  }
}

/**
 * adjusts the highscore text
 */
function listHighScore() {
  highscore = highscore < score ? score : highscore;
  document.querySelector('.highscore').innerHTML = highscore;
}

/**
 * Changes the button of guess or play again based if the user
 * has selected the correct choice
 * @param {*} correct
 */
function buttonDisplays(correct) {
  if (correct) {
    document.querySelector('.btn.check').setAttribute('style', 'display:none;');
    document
      .querySelector('.btn.again')
      .setAttribute('style', 'display:block;');
  } else {
    document
      .querySelector('.btn.check')
      .setAttribute('style', 'display:block;');
    document.querySelector('.btn.again').setAttribute('style', 'display:none;');
  }
}

/**
 * creates a random number after the webpage has loaded
 */
window.onload = () => {
  randomNumber = createRandomNumber();
};

/**
 * resets the current score to the default 20
 */
function resetScore() {
  score = 20;
  document.querySelector('.score').textContent = score;
}

/**
 * reduces the score by 1 and displays the new score
 */
function reduceScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

/**
 * Listends for when play again button is clicked and then runs actions
 * needed to play another time.
 */
document.querySelector('.btn.again').addEventListener('click', function () {
  document.querySelector('.number').textContent = `?`;
  document.querySelector('.message').textContent = `Start Guessing...`;
  randomNumber = createRandomNumber();
  clearGuessedNumber();
  clearCurrentGuesses();
  resetScore();
  buttonDisplays(false);
});

/**
 * Listens for when the check the guess is click and then runs the
 * actions needed. If no number is entered nothing happens
 */
document.querySelector('.btn.check').addEventListener('click', function () {
  const guessedNumber = Number(document.querySelector('.guess').value);
  if (guessedNumber) {
    console.log(document.querySelector('.guess').value);
    checkGuess(guessedNumber);
  }
});
