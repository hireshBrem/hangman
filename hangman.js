const buttons = document.getElementsByClassName("btns");
const hintEl = document.getElementById("hint");
const livesEl = document.getElementById("lives");
const missingWord = document.getElementById("missing-word");
const messageEl = document.getElementById("message");

let answer;
let word;
let guessArray = [];
let lives = 10;
let isCorrect;
let isAlive = true;

const cities = ["Tokyo", "Madrid", "Paris", "London", "Luton", "Edinburgh", "Cardiff", "Dublin", "Warsaw", "Glasgow"]
const food = ["Burger", "Fish", "Chicken", "Beef", "Carrots", "Broccoli", "Crisps", "Onions", "Bread", "Biscuits"]
const sport = ["Baseball", "Football", "Basketball", "Tennis", "Running", "Table Tennis", "Hockey", "Badminton", "Cricket"];
const movies = ["", "", "Martian", "Extinction", "", "", "", "", ""];
const animals = ["Bear", "Tiger", "Lion", "Monkey", "Rhino", "Gorilla", "Elephant", "Kangaroo", "Donkey"];
const subjects = ["Maths", "English", "Biology", "Chemistry", "Physics", "", "", "", ""];
const vegetables = ["Carrots", "Broccoli", "Cabbage", "Spinach", "Sprouts", "Cucumber", "Celery", "Beetroot", "Eggplant"];
const hints = [cities, food, sport, movies, animals, subjects, vegetables];
const hintsStr = ["Cities", "Food", "Sport", "Movies", "Animals", "Subjects", "Vegetables"];

function start(){
    let x = generateRandomNumb();
    hintEl.textContent = "The Chosen Category Is " + hintsStr[x];
    livesEl.textContent = "You have " + lives + " lives";
    answer = generateRandomWord(hints[x]);
    printSpaces();
}

function generateRandomNumb(){
    return Math.floor(Math.random()*hints.length);
}

function generateRandomWord(array) {
    return array[generateRandomNumb()];
}

function printSpaces() {
    word = answer.split("");

    for(i=0;i<word.length;i++){
        if(word[i] === " "){
            guessArray.push("-");
            missingWord.textContent += " ";
        } 
        else{
            guessArray.push("_");
            missingWord.textContent += " _ "
        }
    }
}

function checkGuess(guess){
    isCorrect = false;
    for(i=0; i<word.length; i++){

        if(guess === word[i].toLowerCase()){
            guessArray[i] = word[i];
            isCorrect = true;
        } 
    }
    return isCorrect;
}

function updateGame(isCorrect) {
    if(isCorrect === false) {
        lives-=1;
    }
    if(lives <= 0){
        isAlive = false;
    }
    livesEl.textContent =  "You have " + lives + " lives";
    missingWord.textContent = "";
    for(i=0;i<guessArray.length;i++){
        missingWord.textContent +=  " " + guessArray[i];
    }
}

function checkAnswer(guessArray, word){ 
    if (guessArray.join(",") == word.join(",")){
        messageEl.textContent = "Well done you won!";
    }
}   

start();

document.querySelectorAll(".btns").forEach(button => {
    button.addEventListener("click", function handleClick(event){
        if(isAlive === true){
            let isCorrect = checkGuess(button.id);
            updateGame(isCorrect);
            button.setAttribute("style", "background-color: grey");
            button.setAttribute("disabled", "true");
            checkAnswer(guessArray, word);
        }
        if(isAlive === false) {
            messageEl.textContent = "Game over!";
        }
    });
});