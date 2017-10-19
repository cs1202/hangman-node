var fs = require('fs'); //To include the File System module, use the require()

function getList() { 
  // Pull the letter list and return it as an array
  var file = 'words.txt'; // declaring var file to read external word.txt file 
  var words = fs.readFileSync(file); //Same as readFile(), but synchronous instead of asynchronous
  																//When you execute something synchronously, 
  																//you wait for it to finish before moving on to another task. 
  																//When you execute something asynchronously, 
  																//you can move on to another task before it finishes.

  return words.toString().split('\n'); //The split() method is used to split a string into an array of substrings, and returns the new array.
}

function getWord() {

  var wordsArr = getList();
  return wordsArr[rand(wordsArr.length)].trim(); // Return a random word from the list
}

function rand(len) {
  // Get a random index of the array between 0 and the array length - 1
  return Math.floor(Math.random()*len);
}

module.exports = {
  getWord: getWord
};
