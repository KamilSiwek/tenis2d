console.log('ready');

var cal = document.getElementsByName('body');
var canvas = document.getElementById('tenis-pool');


var ctx = canvas.getContext('2d');



var ww = window.innerWidth;
var wh = window.innerHeight;

canvas.width = ww * 0.7;
canvas.height = ww * 0.35;
var cw = canvas.width;
var ch = canvas.height;
var ballSize = cw/40;

  //Wymiary i pozycja paletek:
var paddleWidth = cw/40;
var paddleHeight = ch/4;

var playerX = 0.1 * cw;
var aiX = 0.9 * cw - paddleWidth;

var playerY = ch/2 - paddleHeight/2;
var aiY = ch/2 - paddleHeight/2;

var playerSpeed = 0;

var centerLineWidth = ww * 0.005;
var centerLineHeight = ww * 0.015;

  //Wymiary i pozycja początkowa piłki:
var ballSpeedX = 0;
var ballSpeedY = 0;

var ballX = playerX + ballSize;
var ballY = playerY + ballSize;


var upButton = document.getElementById('up');
var downButton = document.getElementById('down');
function player(){
  ctx.fillStyle= '#fff';
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  playerY += playerSpeed;
      if (playerY <= 0) {
        playerY = 0;
      }
      if (playerY >= ch - paddleHeight) {
            playerY = ch - paddleHeight
      }
  }

function up() {
  playerSpeed = 0;
  if(ballSpeedY > 0){
    playerSpeed -= ballSpeedY;//1.5;
  }
  if (ballSpeedY < 0) {
    playerSpeed += ballSpeedY;//1.5;
  }
}
function down() {
  playerSpeed = 0;
  if (ballSpeedY > 0) {
    playerSpeed += ballSpeedY;//1.5;
  }
  if (ballSpeedY < 0) {
    playerSpeed -= ballSpeedY;//1.5;
  }

}

function keyControl(e) {
  switch (e.keyCode) {
    case 38:
    playerSpeed = 0;
    if(ballSpeedY > 0){
      playerSpeed -= ballSpeedY;//1.5;
    }
    if (ballSpeedY < 0) {
      playerSpeed += ballSpeedY;//1.5;
    }
      break;
  }
  switch (e.keyCode) {
    case 40:
    playerSpeed = 0;
    if (ballSpeedY > 0) {
      playerSpeed += ballSpeedY;//1.5;
    }
    if (ballSpeedY < 0) {
      playerSpeed -= ballSpeedY;//1.5;
    }
      break;
  }
}
downButton.removeEventListener("click", up);
upButton.removeEventListener("click", down);
window.removeEventListener("keydown", keyControl);
upButton.addEventListener("click", up);
downButton.addEventListener("click", down);
window.addEventListener("keydown", keyControl);

function ai(){
  ctx.fillStyle= '#fff';
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
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
     if (ballSpeedX != 0){
       if (ballSpeedX > 0) {
         ballSpeedX += .3;

       } else if (ballSpeedX < 0) {
         ballSpeedX -= .3;
       }

       if (ballSpeedY > 0) {
         ballSpeedY += .3;
       } else {
         ballSpeedY -= .3;
       }
     }
   }
   //Punktacja:
   var playerPkt = [];
   var aiPkt = [];

   //Wygląd piłki:
function ball() {
  var img = new Image();
  img.src= ('css/img/ball.png');
  ctx.drawImage(img,ballX, ballY, ballSize, ballSize);


  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= ch) { //odbicie od góry lub od dołu
    ballSpeedY = -ballSpeedY;
    speedUp()
  }
  if (ballX <= 0 ) { // przekroczenie lewej krawędzi
    ballSpeedX = 0
    ballSpeedY = 0
    audio = new Audio();
    audio.src = "audio/owacje-bad.wav"
    audio.play();
    ballX = playerX + ballSize
    playerPkt += 1;
    console.log(playerPkt.length);
    document.getElementById('player-score').innerText=playerPkt.length;
  }
  if (ballX + ballSize >= cw) { //przekroczenie prawej krawędzi
    ballSpeedX = 0
    ballSpeedY = 0
    audio = new Audio();
    audio.src = "audio/brawa.wav"
    audio.play();
    ballX = playerX + ballSize

    aiPkt += 1;
    document.getElementById('AI-score').innerText=aiPkt.length;
  }
//  var audio;
  if (ballX  >= playerX && ballX  <= playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) { //Odbicie piłki od rakietki gracza
    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie1.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }
  //  speedUp()
  }
  if (ballX + ballSize >= aiX && ballX <= aiX + paddleWidth && ballY > aiY - paddleHeight/8 && ballY < aiY + paddleHeight) { // Odbicie piłki od rakietki AI

    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie2.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }

    speedUp()
  }
}

function speed() {
}

topCanvas = canvas.offsetTop;

//Poruszanie graczem:
function playerPosition(e){
  if(cw > 700){
    playerY = e.clientY - topCanvas - paddleHeight/2;
  }

  //playerY = e.touches[1].screenY;
  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight
  }
}

canvas.addEventListener("mousemove", playerPosition);

//Ruch AI:
function AIPosition(){
  var middleBall = ballY + ballSize/2;
  var middlePaddle = aiY + paddleHeight/2;
  if(ballX > cw/2){
    if(middlePaddle - middleBall > ch/3){
      aiY -= cw/65; //poziom inteligencji - im większy dzilnik, tym głupszy komputer.
    }
    else if (middlePaddle - middleBall > ch/10) {
      aiY -= cw/110;
    }
    else if (middlePaddle - middleBall < -(ch/3)) {
      aiY += cw/65;
    }
    else if (middlePaddle - middleBall < -(ch/10)) {
      aiY += cw/110;
    }
  }
  if (ballX <= cw/2 && ballX > cw/10) {
     if (middlePaddle - middleBall > ch/4) {
       aiY -= cw/300;
     }
     if (middlePaddle - middleBall < -(ch/10)) {
       aiY += cw/300;
     }
   }
  if (aiY <= 0) {
    aiY = 0;
  }
  if (aiY >= ch - paddleHeight) {
        aiY = ch - paddleHeight
  }
}

//funkcja serwowania:
function serve(){
  if(ballX == playerX + ballSize){
    ballSpeedX = cw/200;
    ballSpeedY = cw/200;
    audio = new Audio();
    audio.src = "audio/serw.wav"
    audio.play();
  }
}
function serveKey(e) {
  switch (e.keyCode) {
    case 32:
    if(ballX == playerX + ballSize){
      ballSpeedX = cw/200;
      ballSpeedY = cw/200;
      audio = new Audio();
      audio.src = "audio/serw.wav"
      audio.play();
      break;
    }
  }
}
canvas.addEventListener("click", serve);
window.addEventListener('keydown', serveKey);

function serveAi() {
  if(ballX == aiX - ballSize && ballSpeedY == 0){
    ballSpeedX = -4;
    ballSpeedY = 4;
    audio = new Audio();
    audio.src = "audio/serw.wav"
    audio.play();
    }
  }

function startBallPosition() {
  if (ballSpeedX ==0 && ballSpeedY == 0) {
      ballY = playerY
    }
}

//Wywoływanie funkcji:

function game(){
  pool()
  ball()
  player()
  ai()
  AIPosition()
  startBallPosition()
  serveAi()
}

    setInterval(game,1000/60);
