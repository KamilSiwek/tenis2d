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

let ballSpeedX = 1;
let ballSpeedY = 1;

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
function ball() {
  ctx.fillStyle= 'green';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function game(){
  pool()
  ball()
  player()
  ai()
}
setInterval(game,20);
