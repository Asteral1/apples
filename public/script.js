const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const basket = { x: canvas.width / 2 - 40, y: canvas.height - 60, width: 80, height: 40 };
let apples = [];
let score = 0;
let speed = 3;

function drawBasket() {
  ctx.fillStyle = "#6a4c1e";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawApple(apple) {
  ctx.beginPath();
  ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function generateApple() {
  const x = Math.random() * (canvas.width - 20) + 10;
  apples.push({ x, y: 0, radius: 10 });
}

function moveApples() {
  apples.forEach(apple => (apple.y += speed));
  apples = apples.filter(apple => apple.y < canvas.height);
}

function checkCollision() {
  apples.forEach((apple, index) => {
    if (
      apple.y + apple.radius > basket.y &&
      apple.x > basket.x &&
      apple.x < basket.x + basket.width
    ) {
      apples.splice(index, 1);
      score++;
      speed += 0.1;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  apples.forEach(drawApple);
  moveApples();
  checkCollision();
  drawScore();
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && basket.x > 0) {
    basket.x -= 20;
  } else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
    basket.x += 20;
  }
});

setInterval(gameLoop, 20);
setInterval(generateApple, 1000);
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const basket = { x: canvas.width / 2 - 40, y: canvas.height - 60, width: 80, height: 40 };
let apples = [];
let score = 0;
let speed = 3;

function drawBasket() {
  ctx.fillStyle = "#6a4c1e";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawApple(apple) {
  ctx.beginPath();
  ctx.arc(apple.x, apple.y, apple.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function generateApple() {
  const x = Math.random() * (canvas.width - 20) + 10;
  apples.push({ x, y: 0, radius: 10 });
}

function moveApples() {
  apples.forEach(apple => (apple.y += speed));
  apples = apples.filter(apple => apple.y < canvas.height);
}

function checkCollision() {
  apples.forEach((apple, index) => {
    if (
      apple.y + apple.radius > basket.y &&
      apple.x > basket.x &&
      apple.x < basket.x + basket.width
    ) {
      apples.splice(index, 1);
      score++;
      speed += 0.1;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  apples.forEach(drawApple);
  moveApples();
  checkCollision();
  drawScore();
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && basket.x > 0) {
    basket.x -= 20;
  } else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
    basket.x += 20;
  }
});

setInterval(gameLoop, 20);
setInterval(generateApple, 1000);
