// 1. Get references to our HTML elements
const square = document.getElementById('target-square');
const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// 2. Game Variables
let score = 0;
let timeRemaining = 10; // Game duration in seconds
const squareSize = 50; // Must match CSS
const max_x = container.clientWidth - squareSize;
const max_y = container.clientHeight - squareSize;

// Function to move the square to a random position
function moveSquare() {
    // Generate random coordinates within the container bounds
    const new_x = Math.floor(Math.random() * max_x);
    const new_y = Math.floor(Math.random() * max_y);

    square.style.left = new_x + 'px';
    square.style.top = new_y + 'px';
}

// Function to handle a successful click
function handleSquareClick() {
    if (timeRemaining > 0) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        moveSquare(); // Move the square immediately
    }
}

// Function to manage the timer
function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerDisplay.textContent = 'Time: ' + timeRemaining;
    } else {
        clearInterval(timerInterval); // Stop the timer
        alert('Game Over! Your final score is: ' + score);
        square.removeEventListener('click', handleSquareClick); // Disable clicks
        square.style.backgroundColor = '#7f8c8d'; // Change color to gray
    }
}

// 4. Set up Event Listeners
square.addEventListener('click', handleSquareClick);

// 5. Start the Game
moveSquare(); // Initial position
// Set up a timer that calls updateTimer every second (1000 milliseconds)
const timerInterval = setInterval(updateTimer, 1000);
