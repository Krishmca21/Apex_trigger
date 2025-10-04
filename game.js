// 1. Get references to our HTML elements
const square = document.getElementById('target-square');
const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// 2. Game Variables
let score = 0;
let timeRemaining = 10;
let squareSize = 50;
let max_x = container.clientWidth - squareSize;
let max_y = container.clientHeight - squareSize;
let moveInterval;
let scoreMultiplier = 1; // NEW: Controls the point value of a click

// ------------------------------------------
// FEATURE 1: Difficulty Scaling Logic
// ------------------------------------------

function updateDifficulty() {
    // Reduce the square size every 5 points, down to a minimum of 20px
    if (score > 0 && score % 5 === 0 && squareSize > 20) {
        squareSize -= 5; 
        
        square.style.width = squareSize + 'px';
        square.style.height = squareSize + 'px';
        
        max_x = container.clientWidth - squareSize;
        max_y = container.clientHeight - squareSize;
    }
}

// ------------------------------------------
// FEATURE 2: Temporary Speed Boost Logic (Requires .fast-mode in CSS)
// ------------------------------------------

function applySpeedBoost() {
    if (timeRemaining > 0) { // Only apply if the game is running
        square.classList.add('fast-mode');
        setTimeout(() => {
            square.classList.remove('fast-mode');
        }, 1500); 
    }
}

// ------------------------------------------
// NEW FEATURE 3: Score Multiplier Bonus Logic
// ------------------------------------------

function activateBonus() {
    // Set multiplier and change color for 2 seconds
    scoreMultiplier = 2;
    square.style.backgroundColor = '#f1c40f'; // Change to Yellow/Gold
    
    // Set a timeout to reset the bonus after 2 seconds (2000ms)
    setTimeout(() => {
        scoreMultiplier = 1; // Reset multiplier
        square.style.backgroundColor = '#e74c3c'; // Reset to Red
    }, 2000);
}

// Function to move the square to a random position
function moveSquare() {
    // Check for random chance to apply speed boost
    if (Math.random() < 0.1) {
        applySpeedBoost();
    }
    
    // NEW: Check for random chance (e.g., 1 in 15) to activate the bonus
    if (Math.random() < 0.065) { // Roughly 6.5% chance
        activateBonus();
    }
    
    max_x = container.clientWidth - squareSize;
    max_y = container.clientHeight - squareSize;

    const new_x = Math.floor(Math.random() * max_x);
    const new_y = Math.floor(Math.random() * max_y);

    square.style.left = new_x + 'px';
    square.style.top = new_y + 'px';
}

// Function to handle a successful click
function handleSquareClick() {
    if (timeRemaining > 0) {
        // Use the current multiplier to update the score
        score += scoreMultiplier; 
        scoreDisplay.textContent = 'Score: ' + score;
        
        updateDifficulty(); 
        
        // Reset and restart the movement interval
        clearInterval(moveInterval);
        moveSquare();
        moveInterval = setInterval(moveSquare, 800); 
    }
}

// Function to manage the timer
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerDisplay.textContent = 'Time: ' + timeRemaining;
    } else {
        clearInterval(timerInterval); 
        clearInterval(moveInterval);
        alert('Game Over! Your final score is: ' + score);
        square.removeEventListener('click', handleSquareClick); 
        square.style.backgroundColor = '#7f8c8d'; // A grey color
    }
}

// Initial Setup
square.addEventListener('click', handleSquareClick);
let timerInterval = setInterval(updateTimer, 1000);
moveInterval = setInterval(moveSquare, 800);
