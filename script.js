// // let timerCount = 30; // Initial countdown timer value
// // let score = 0; // Initialize the score
// // let timerInterval; // Interval for updating the timer
// // let gameRunning = false; // Variable to track if the game is running

// // function startGame() {
// //   const timerElement = document.getElementById("timer");
// //   if (timerElement.innerText !== "30" || gameRunning) {
// //     // Game already started or is running, do nothing
// //     return;
// //   }

// //   // Reset score to zero at the start of each game
// //   score = 0;

// //   gameRunning = true; // Set game to running
// //   timerElement.innerText = timerCount;
// //   timerInterval = setInterval(updateTimer, 1000);
// // }

// // Get the game grid element by its ID
// // const gameGrid = document.getElementById("gameGrid");

// // function generateGameGrid() {
// //   gameGrid.innerHTML = "";

// //   const circles = [];

// //   for (let i = 0; i < 25; i++) {
// //     const circle = document.createElement("div");
// //     circle.classList.add("circle");
// //     circles.push(circle);
// //     gameGrid.appendChild(circle);
// //   }

// //   // Place the first circle in the middle
// //   const middleIndex = Math.floor(circles.length / 2);
// //   circles[middleIndex].classList.add("active");
// // }

// // Event listener for game grid clicks
// // gameGrid.addEventListener("click", (event) => {
// //   const target = event.target;
// //   if (!target.classList.contains("active")) return;

// //   if (!gameRunning) {
// //     startGame();
// //   }

// //   target.classList.remove("active");
// //   score++;
// //   activateRandomCircle();
// // });

// function updateTimer() {
//   timerCount--;
//   document.getElementById("timer").innerText = timerCount;
//   if (timerCount === 0) {
//     clearInterval(timerInterval);
//     resetGame();
//   }
// }

// // function activateRandomCircle() {
// //   const circles = document.querySelectorAll(".circle");
// //   circles.forEach((circle) => circle.classList.remove("active"));

// //   const randomIndex = Math.floor(Math.random() * circles.length);
// //   circles[randomIndex].classList.add("active");
// // }

// // function resetGame() {
// //   timerCount = 30; // Reset the timer
// //   document.getElementById("timer").innerText = timerCount;
// //   gameRunning = false; // Reset game state to not running

// //   // Display game over message with the score
// //   const gameOverMessage = document.getElementById("gameOverMessage");
// //   gameOverMessage.innerText = `Game over! Your score was ${score}`;
// //   gameOverMessage.style.display = "block";

// //   generateGameGrid(); // Regenerate the game grid for a new game
// // }

// // Initially generate the game grid
// // generateGameGrid();

// /* ******************************************************************************************* */
let playing = false;
let hits = 0;
let missed = 0;
let accuracy = 0;
let time = 0;

const startBtn = document.querySelector("#start");
const board = document.querySelector("#board");
const hitsEl = document.querySelector("#hits");
const accuracyEl = document.querySelector("#accuracy");
const timeEl = document.querySelector("#time");
const welcome = document.querySelector("#welcome");
const highscoreTableBody = document.getElementById("highscoreTableBody");
const resetBtn = document.querySelector("#reset");
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");
const expertBtn = document.querySelector("#expert");

displayHighscore();
let timer;
let currentDifficulty = 0; // Initialize currentDifficulty to 0

// Add event listeners to difficulty buttons
document.getElementById("easy").addEventListener("click", () => {
  toggleButtonState(easyBtn, 1);
});
document.getElementById("medium").addEventListener("click", () => {
  toggleButtonState(mediumBtn, 2);
});
document.getElementById("hard").addEventListener("click", () => {
  toggleButtonState(hardBtn, 3);
});
document.getElementById("expert").addEventListener("click", () => {
  toggleButtonState(expertBtn, 4);
});

// Function to handle button state
function toggleButtonState(selectedButton, difficulty) {
  const buttons = [easyBtn, mediumBtn, hardBtn, expertBtn];
  const disabled = selectedButton.getAttribute("disabled") === "true";

  if (disabled || difficulty === currentDifficulty) {
    // If the selected button is already disabled or it's the same difficulty as the current one, enable all buttons and set currentDifficulty to 0.
    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    });
    currentDifficulty = 0;
  } else {
    buttons.forEach((button) => {
      if (button !== selectedButton) {
        button.setAttribute("disabled", true);
      }
    });
    currentDifficulty = difficulty;
  }
}

// Add a click event listener to the "Start Game" button
startBtn.addEventListener("click", () => {
  startGame();
});

// Add a click event listener to the "Reset  Score" button
resetBtn.addEventListener("click", () => {
  resetScore();
});

function startGame() {
  document.getElementById("choose-difficulty").style.display = "none";
  document.getElementById("easy").style.display = "none";
  document.getElementById("medium").style.display = "none";
  document.getElementById("hard").style.display = "none";
  document.getElementById("expert").style.display = "none";

  startBtn.style.display = "none"; //hides the start game button
  welcome.style.display = "none";
  resetBtn.style.display = "none";
  // Initialize game variables and start creating random circles
  playing = true;
  hits = 0;
  missed = 0;
  accuracy = 0;
  hitsEl.textContent = hits;
  accuracyEl.textContent = `${accuracy}%`;
  createRandomCircle();

  // Set a 30-second timer
  let remainingTime = 30;
  updateTimerDisplay(remainingTime);

  timer = setInterval(() => {
    remainingTime--;
    if (remainingTime === 0) {
      clearInterval(timer);
      gameOver(); // Call the gameOver function after 30 seconds
    } else {
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
}

function updateTimerDisplay(remainingTime) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  //converts the minutes and seconds into a string.
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  timeEl.textContent = formattedTime;
}

function createRandomCircle() {
  // return when Do nothing
  if (!playing) {
    return;
  }

  const circle = document.createElement("div");
  const size = getRandomNumber(40, 100);
  // const size = 80;

  //method available on DOM elements that returns the position and dimensions of the element relative to the viewport
  const { width, height } = board.getBoundingClientRect();
  //random locations of the circle
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);

  //Dificulty level settings
  if (currentDifficulty === 1) {
    circle.style.animationDuration = "5s";
  } else if (currentDifficulty === 2) {
    circle.style.animationDuration = "3s";
  } else if (currentDifficulty === 3) {
    circle.style.animationDuration = "2s";
  } else {
    circle.style.animationDuration = "1s";
  }

  // Create new circle when the current one disappears
  circle.addEventListener("animationend", () => {
    circle.remove();
    if (playing) {
      createRandomCircle();
      // If a circle disappears before being clicked, it's counted as a miss
      missed++;
      // Recalculate accuracy
      calculateAccuracy();
    }
  });

  // Add event when circle is clicked
  circle.addEventListener("click", (e) => {
    if (e.target.classList.contains("circle")) {
      if (e.target === circle) {
        // Increase hits by 1
        hits++;
        // Remove circle
        e.target.remove();
        // Create a new circle
        if (playing) {
          createRandomCircle();
        }
        calculateAccuracy();
      }
    } else {
      // Circle missed when clicked
      missed++;
      // Recalculate accuracy
      calculateAccuracy();
    }
    // Show hits on the document
    hitsEl.textContent = hits;
  });
}

function calculateAccuracy() {
  if (hits + missed === 0) {
    accuracy = 0; // Prevent division by zero
  } else {
    accuracy = (hits / (hits + missed)) * 100;
  }
  accuracy = accuracy.toFixed(2);
  accuracyEl.textContent = `${accuracy}%`;
}

//function to get a random number within a max and min range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

//function that the game is over
function gameOver() {
  playing = false;

  timeEl.textContent = "00:00";

  highScoresJson.push(hits);
  highScoresJson.sort((a, b) => b - a);
  highScoresJson.splice(10);
  localStorage.setItem("highScores", JSON.stringify(highScoresJson));
  displayHighscore();

  board.innerHTML = `
  <h1>Game Over</h1>
  <button class="btn" id="play-again">Play Again</button>`;

  // Add a click event listener to the "Play Again" button
  const playAgainBtn = document.querySelector("#play-again");

  playAgainBtn.addEventListener("click", () => {
    window.location.reload(); // Reload the page to start a new game
  });
}

function displayHighscore() {
  highScoresJson = JSON.parse(localStorage.getItem("highScores")) || [];

  highscoreTableBody.innerHTML = highScoresJson
    .map(
      (score, index) =>
        `<tr><th scope="col">${
          index + 1
        }</th><th scope="col">${score}</th></tr>`
    )
    .join("");
}

//reset high score
function resetScore() {
  localStorage.removeItem("highScores");
  displayHighscore();
}
