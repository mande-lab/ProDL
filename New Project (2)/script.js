const bird = document.getElementById("bird");
const obstaclesContainer = document.getElementById("obstacles");
const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");

let birdTop = 280;
let gravity = 2; // Initial gravity direction (downwards)
let gameSpeed = 2;
let score = 0;
let gameInterval;
let obstacleInterval;

// Start the game
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  resetGame();
  startGame();
});

// Reset game state
function resetGame() {
  birdTop = 280;
  score = 0;
  scoreElement.textContent = "Score: 0";
  obstaclesContainer.innerHTML = "";
  bird.style.top = `${birdTop}px`;
}

// Start the game loop
function startGame() {
  gameInterval = setInterval(updateGame, 20);
  obstacleInterval = setInterval(createObstacle, 2000);
}

// Update game state
function updateGame() {
  birdTop += gravity;
  bird.style.top = `${birdTop}px`;

  // Check for collisions
  if (birdTop <= 0 || birdTop >= 560 || checkCollision()) {
    endGame();
  }

  // Move obstacles
  const obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach((obstacle) => {
    let obstacleLeft = parseInt(obstacle.style.left);
    obstacleLeft -= gameSpeed;
    obstacle.style.left = `${obstacleLeft}px`;

    // Remove obstacles that are off-screen
    if (obstacleLeft < -60) {
      obstacle.remove();
      increaseScore();
    }
  });
}

// Create a new obstacle
function createObstacle() {
  const gap = 150; // Gap between top and bottom pillars
  const obstacleHeight = Math.floor(Math.random() * (400 - gap));

  // Top pillar
  const topPillar = document.createElement("div");
  topPillar.style.height = `${obstacleHeight}px`;
  topPillar.style.left = "400px";  // Positioning it at the correct place horizontally
  topPillar.style.position = "absolute";  // Ensure it’s positioned correctly
  topPillar.classList.add("obstacle");
  obstaclesContainer.appendChild(topPillar);

  // Bottom pillar
  const bottomPillar = document.createElement("div");
  bottomPillar.style.height = `${560 - obstacleHeight - gap}px`;
  bottomPillar.style.left = "400px";  // Same left position for alignment
  bottomPillar.style.position = "absolute";  // Ensure it’s positioned correctly
  bottomPillar.classList.add("obstacle");
  obstaclesContainer.appendChild(bottomPillar);
  const bottomPillarS = document.createElement("div");
  bottomPillarS.style.height = `${560 - obstacleHeight - gap}px`;
  bottomPillarS.style.bottom = "0";
  bottomPillarS.style.left = "400px";
  bottomPillarS.classList.add("obstacle");
  obstaclesContainer.appendChild(bottomPillar);
}


// Check for collisions
function checkCollision() {
  const birdRect = bird.getBoundingClientRect();
  const obstacles = document.querySelectorAll(".obstacle");

  for (let obstacle of obstacles) {
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
      birdRect.left < obstacleRect.right &&
      birdRect.right > obstacleRect.left &&
      birdRect.top < obstacleRect.bottom &&
      birdRect.bottom > obstacleRect.top
    ) {
      return true;
    }
  }
  return false;
}

// Increase score
function increaseScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // Change gravity direction every 5 points
  if (score % 5 === 0) {
    gravity *= -1;
    swal({
      title: "Gravity Shift!",
      text: `Gravity is now ${gravity > 0 ? "downwards" : "upwards"}!`,
      icon: "info",
      button: "OK",
    });
  }
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  swal({
    title: "Game Over!",
    text: `Your score is ${score}`,
    icon: "error",
    button: "Play Again",
  }).then(() => {
    startButton.style.display = "block";
  });
}

// Handle spacebar to flap
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    // Jump in the opposite direction of gravity
    birdTop += gravity > 0 ? -50 : 50; // Move opposite to gravity
    bird.style.top = `${birdTop}px`;
  }
});