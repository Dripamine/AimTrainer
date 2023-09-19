let timerCount = 30; // Initial countdown timer value
let score = 0; // Initialize the score
let timerInterval; // Interval for updating the timer
let gameRunning = false; // Variable to track if the game is running

function startGame() {
  const timerElement = document.getElementById("timer");
  if (timerElement.innerText !== "30" || gameRunning) {
    // Game already started or is running, do nothing
    return;
  }

  // Reset score to zero at the start of each game
  score = 0;

  gameRunning = true; // Set game to running
  timerElement.innerText = timerCount;
  timerInterval = setInterval(updateTimer, 1000);
}

// Get the game grid element by its ID
const gameGrid = document.getElementById("gameGrid");

function generateGameGrid() {
  gameGrid.innerHTML = "";

  const circles = [];

  for (let i = 0; i < 25; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circles.push(circle);
    gameGrid.appendChild(circle);
  }

  // Place the first circle in the middle
  const middleIndex = Math.floor(circles.length / 2);
  circles[middleIndex].classList.add("active");
}

// Event listener for game grid clicks
gameGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("active")) return;

  if (!gameRunning) {
    startGame();
  }

  target.classList.remove("active");
  score++;
  activateRandomCircle();
});

function updateTimer() {
  timerCount--;
  document.getElementById("timer").innerText = timerCount;
  if (timerCount === 0) {
    clearInterval(timerInterval);
    resetGame();
  }
}

function activateRandomCircle() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => circle.classList.remove("active"));

  const randomIndex = Math.floor(Math.random() * circles.length);
  circles[randomIndex].classList.add("active");
}

function resetGame() {
  timerCount = 30; // Reset the timer
  document.getElementById("timer").innerText = timerCount;
  gameRunning = false; // Reset game state to not running

  // Display game over message with the score
  const gameOverMessage = document.getElementById("gameOverMessage");
  gameOverMessage.innerText = `Game over! Your score was ${score}`;
  gameOverMessage.style.display = "block";

  generateGameGrid(); // Regenerate the game grid for a new game
}

// Initially generate the game grid
generateGameGrid();
