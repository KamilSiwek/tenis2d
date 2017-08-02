console.log('ready');

const canvas = document.getElementById('tenis-pool');
//const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
var cw = canvas.width;
var ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2
let ballY = ch/2 - ballSize/2

const paddelWidth = 20;
const paddelHeight = 100;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;


const centerLineWidth = 6;
const centerLineHeight = 16;

let ballSpeedX = 4;
let ballSpeedY = 4;

function player(){
  ctx.fillStyle= '#fff';
  ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}
function ai(){
  ctx.fillStyle= '#fff';
  ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
}

function pool() {
  //boisko
  ctx.fillStyle = 'orange';
  ctx.fillRect(0,0,cw,ch);
  //Siatka na środku
  for (let linePosition = 20; linePosition < ch; linePosition +=30){
    ctx.fillStyle = "#fff"
    ctx.fillRect(cw/2 -centerLineWidth/2, linePosition, centerLineWidth, centerLineHeight);
  }
}

//wywoływana gdy nastąpi zderzenie ze ścianą lub rakietką

   function speedUp() {
     if (ballSpeedX > 0) {
       ballSpeedX += .05;

     } else if (ballSpeedX < 0) {
       ballSpeedX -= .05;
     }

     if (ballSpeedY > 0) {
       ballSpeedY += .05;
     } else {
       ballSpeedY -= .05;
     }
   }

function ball() {
  ctx.fillStyle= 'green';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= ch) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballX <= 0 ) { //|| ballX + ballSize >= cw
    // ballSpeedX = -ballSpeedX
    ballSpeedX = 0
    ballSpeedY = 0
    // ballX = cw/2 - ballSize/2
    // ballY = ch/2 - ballSize/2
    ballX = playerX + ballSize
    ballY = playerY
  }
  if (ballX + ballSize >= cw) {
    // ballSpeedX = -ballSpeedX
    ballSpeedX = 0
    ballSpeedY = 0
    // ballX = cw/2 - ballSize/2
    // ballY = ch/2 - ballSize/2
    ballX = aiX - ballSize
    ballY = aiY
  }
  if (ballX - ballSize == playerX && ballY > playerY && ballY < playerY + paddelHeight) {
    ballSpeedX = -ballSpeedX
    //speedUp()
  }
  if (ballX + ballSize == aiX && ballY > aiY && ballY < aiY + paddelHeight) {
    ballSpeedX = -ballSpeedX
    //speedUp()
  }
}

topCanvas = canvas.offsetTop;

function playerPosition(e){
  playerY = e.clientY - topCanvas - paddelHeight/2;
  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
  }
  aiY=playerY;
}

canvas.addEventListener("mousemove", playerPosition);

//funkcja serwowania:
function serve(){
  if(ballX == playerX + ballSize){
    ballSpeedX = 4;
    ballSpeedY = 4;
  }
  if(ballX == aiX - ballSize){
    ballSpeedX = -4;
    ballSpeedY = 4;
  }
}
canvas.addEventListener("click", serve);

//Wywoływanie funkcji:

function game(){
  pool()
  ball()
  player()
  ai()
}
setInterval(game,10);
