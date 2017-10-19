var inquirer = require('inquirer');  //npm install inquirer:A collection of common interactive command line user interfaces.

var game = require('./game.js'); 
var word = require('./word.js');

console.log(game.getWord());

function Hangman() {  //constructor Hangman
  word.storeWord(game.getWord());
  this.chances = 10; //
  this.printHangman();
  this.startPrompt();
}

// Print the current stats of the hangman game, takes an argument for a custom message that will display near the bottom if it exists
Hangman.prototype.printHangman = function(customMsg) {
  console.log('          Hangman Again!  _/¯(;;)_/¯           ');
  console.log('========welcome to music world!!!======');
  console.log(' ');
  console.log('Chances left: ' + this.chances);
  console.log('Letters guessed: ' + word.guessed.join(' ').toUpperCase());
  console.log(' ');
  console.log('Your Word: ' + word.showWord.join(' ').toUpperCase());
  console.log(' ');
  console.log('========================================');
  console.log(' ');
  if(customMsg) {
    console.log(customMsg);
    console.log(' ');
  }

};

Hangman.prototype.startPrompt = function() {

  var self = this;

  // Prompt for letter guess
  inquirer.prompt([
  {
    type: 'input',
    name: 'guess',
    message: 'Please enter a letter: ',
    validate: function(input) {
        // Check if input is a longer than a letter or not an alphabetical character
        if(input.length > 1 || !input.match(/[a-z]/i)) {
          return false;
        }
        return true;
      }
    }
    ]).then(function(userData) {

      if(self.processGuess(userData.guess)) {
      // Win message
      self.printHangman('Congratulations, you win! The word was.. ' + word.chosenWord.toUpperCase());
      startGame(1);
    } else if(self.chances === 0) {
      // Lose message
      self.printHangman('You are out of chances! You lose! The word was.. ' + word.chosenWord.toUpperCase());
      startGame(1);
    } else {
      // Prompt for next guess
      self.startPrompt();
    }

  });

  };

  Hangman.prototype.processGuess = function(guess) {

  // Check if letter was already guessed
  if(word.checkGuessed(guess)) {

    // Check if letter guessed is in the word, if so it will return true
    var check = word.checkWord(guess);

    if(check) {

      // If the progressWord array is equal to the chosenWord letter length, then the win condition is met
      if(word.progressWord.length === word.chosenWord.length) {
        return true;
      }

      // else, send message that the letter was in the word.
      this.printHangman(guess.toUpperCase() + ' is a letter in the word.');
    } else {

      // Remove chance, letter was not in the word.
      this.chances--;
      this.printHangman(guess.toUpperCase() + ' was not found in the word.');
    }
  } else {
    this.printHangman('You\'ve already guess the letter ' + guess.toUpperCase() + '!');
  }

  return false;

};

// Begin the Game!
function startGame(again) {

  // If again is a truthy statement, ask if user would like to play again
  var msg = again ? 'Want to play again?' : 'Would you like to play?';

  inquirer.prompt([{
    type: 'confirm',
    name: 'play',
    message: msg
  }]).then(function(data) {
    if(data.play) {

      // Start hangman class
      var hgm = new Hangman();
    } else {
      console.log('Maybe another time!');
    }
  });
}

// console.log('===============================================');
// console.log('==============  hangman Reborn=================');
// console.log('===============================================');

startGame();
