console.log('ready');

const canvas = document.getElementById('tenis-pool');

const ctx = canvas.getContext('2d');

var ww = window.innerWidth;

canvas.width = 800;
canvas.height = 400;
var cw = canvas.width;
var ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2
let ballY = ch/2 - ballSize/2

const paddelWidth = 20;
const paddelHeight = 100;

const playerX = 0.1 * cw;
const aiX = 0.9 * cw;

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
  for (let linePosition = ch*0.02; linePosition < ch; linePosition +=ch*0.1){
    ctx.fillStyle = "#fff"
    ctx.fillRect(cw/2 -centerLineWidth/2, linePosition, centerLineWidth, centerLineHeight);
  }
}

//wywoływana gdy nastąpi zderzenie ze ścianą lub rakietką

   function speedUp() {
     if (ballSpeedX > 0) {
       ballSpeedX += .01;

     } else if (ballSpeedX < 0) {
       ballSpeedX -= .01;
     }

     if (ballSpeedY > 0) {
       ballSpeedY += .01;
     } else {
       ballSpeedY -= .01;
     }
   }
   //Punktacja:

   var playerPkt = [];
   var aiPkt = [];

   //Wygląd piłki:
function ball() {
//  ctx.fillStyle= 'green';
  var img = new Image();
  img.src= ('css/img/ball.png');
  ctx.drawImage(img,ballX, ballY, ballSize, ballSize);
  //ctx.fillRect(ballX, ballY, ballSize, ballSize);


  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= ch) { //odbicie od góry lub od dołu
    ballSpeedY = -ballSpeedY;
  }
  if (ballX <= 0 ) { // przekroczenie lewej krawędzi
    // ballSpeedX = -ballSpeedX
    ballSpeedX = 0
    ballSpeedY = 0
    audio = new Audio();
    audio.src = "audio/owacje-bad.wav"
    audio.play();
    // ballX = cw/2 - ballSize/2
    // ballY = ch/2 - ballSize/2
    ballX = playerX + ballSize
    ballY = playerY
    playerPkt += 1;
    // for(var i=0; i<pkt.length; i += 1) {
    //   pkt.length += 1;
    // }
    console.log(playerPkt.length);
    document.getElementById('player-score').innerText=playerPkt.length;
  }
  if (ballX + ballSize >= cw) { //przekroczenie prawej krawędzi
    // ballSpeedX = -ballSpeedX
    ballSpeedX = 0
    ballSpeedY = 0
    audio = new Audio();
    audio.src = "audio/brawa.wav"
    audio.play();



    // ballX = cw/2 - ballSize/2
    // ballY = ch/2 - ballSize/2
    ballX = aiX - ballSize

    aiPkt += 1;
    document.getElementById('AI-score').innerText=aiPkt.length;
    ballY = aiY
  }
//  var audio;
  if (ballX - ballSize == playerX && ballY > playerY && ballY < playerY + paddelHeight) { //Odbicie piłki od rakietki gracza
    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie1.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }
    //speedUp()
  }
  if (ballX + ballSize == aiX && ballY > aiY && ballY < aiY + paddelHeight) { // Odbicie piłki od rakietki AI
    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie2.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }

    //speedUp()
  }
  //return pkt;
}
console.log(ball());






topCanvas = canvas.offsetTop;
console.log(topCanvas);

//Poruszanie graczem:
function playerPosition(e){
  playerY = e.clientY - topCanvas - paddelHeight/2;
  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
  }
  //aiY=playerY;
}

canvas.addEventListener("mousemove", playerPosition);

//Ruch AI:
function AIPosition(e){
  aiY = ballY - paddelHeight/2;
  if (aiY <= 0) {
    aiY = 0;
  }
  if (aiY >= ch - paddelHeight) {
        aiY = ch - paddelHeight
  }
}

//funkcja serwowania:
function serve(){
  if(ballX == playerX + ballSize){
    ballSpeedX = 4;
    ballSpeedY = 4;
    audio = new Audio();
    audio.src = "audio/serw.wav"
    audio.play();
  }
  if(ballX == aiX - ballSize){
    ballSpeedX = -4;
    ballSpeedY = 4;
    audio = new Audio();
    audio.src = "audio/serw.wav"
    audio.play();
  }
}
canvas.addEventListener("click", serve);



// var myScore;
//
// function Score() {
//   myScore = new component("30px", "Consolas", "white", 280, 40, "text");
// }
// Score()
//Wywoływanie funkcji:

function game(){
  pool()
  ball()
  player()
  ai()
  AIPosition()
  //score()
}
setInterval(game,10);
