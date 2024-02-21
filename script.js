const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerX = canvas.width / 2;
let playerY = canvas.height - 20;
let playerWidth = 50;
let playerHeight = 10;

let squares = [];

function spawnSquare() {
  squares.push({
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: Math.random() * 5 + 2,
  });
}

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function drawSquares() {
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    ctx.fillStyle = "red";
    ctx.fillRect(square.x, square.y, square.width, square.height);
    square.y += square.speed;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawSquares();

  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];
    if (square.y + square.height > canvas.height) {
      squares.splice(i, 1);
    } else if (
      square.x + square.width > playerX &&
      square.x < playerX + playerWidth &&
      square.y + square.height > playerY &&
      square.y < playerY + playerHeight
    ) {
      // Increase score here
      squares.splice(i, 1);
    }
  }

  spawnSquare();

  requestAnimationFrame(update);
}

document.addEventListener("mousemove", (event) => {
  playerX = event.clientX - playerWidth / 2;
});

update();
