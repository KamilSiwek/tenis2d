console.log('ready');

var canvas = document.getElementById('tenis-pool');

var ctx = canvas.getContext('2d');

var ww = window.innerWidth;

canvas.width = 800;
canvas.height = 400;
var cw = canvas.width;
var ch = canvas.height;

var ballSize = 20;
// let ballX = cw/2 - ballSize/2;
// let ballY = ch/2 - ballSize/2;




var paddelWidth = 20;
var paddelHeight = 100;

var playerX = 0.1 * cw;
var aiX = 0.9 * cw;

var playerY = 200;
var aiY = 200;


var centerLineWidth = 6;
var centerLineHeight = 16;

var ballSpeedX = 0;
var ballSpeedY = 0;

var ballX = playerX + ballSize;
var ballY = playerY + ballSize;



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
    //ballY = playerY
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
    //ballX = aiX - ballSize
    ballX = playerX + ballSize

    aiPkt += 1;
    document.getElementById('AI-score').innerText=aiPkt.length;
  //  ballY = aiY
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
  if (ballX + ballSize == aiX && ballY > aiY - paddelHeight/2 && ballY < aiY + paddelHeight) { // Odbicie piłki od rakietki AI

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
//  canvas.y = e.touches[5].screenY;
  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
  }
  //aiY=playerY;
}

canvas.addEventListener("mousemove", playerPosition);
//canvas.addEventListener("touchmove", playerPosition);


//Ruch AI:
function AIPosition(){
  var middleBall = ballY + ballSize/2;
  var middlePaddel = aiY + paddelHeight/2;
  //aiY = ballY - paddelHeight/2;
  if(ballX > 500){
    if(middlePaddel - middleBall > 200){
      aiY -= 30;
    }
    else if (middlePaddel - middleBall > 50) {
      aiY -= 10;
    }
    else if (middlePaddel - middleBall < -200) {
      aiY += 30;
    }
    else if (middlePaddel - middleBall <-50) {
      aiY += 10;
    }
  }
  if (ballX <= 500 && ballX > 100) {
     if (middlePaddel - middleBall > 100) {
       aiY -= 30;
     }
     if (middlePaddel - middleBall < -100) {
       aiY += 30;
     }
   }
  // else if (ballX < 500){
  //     aiY = ballX;
  // }
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
  // if(ballX == aiX - ballSize){
  //   ballSpeedX = -4;
  //   ballSpeedY = 4;
  //   audio = new Audio();
  //   audio.src = "audio/serw.wav"
  //   audio.play();
  // }
}
canvas.addEventListener("click", serve);

// function test() {
//   ballSpeedX = -4;
//   ballSpeedY = 4;
//   audio = new Audio();
//   audio.src = "audio/serw.wav"
//   audio.play();
// }
function serveAi() {
  if(ballX == aiX - ballSize && ballSpeedY == 0){
    ballSpeedX = -4;
    ballSpeedY = 4;
    audio = new Audio();
    audio.src = "audio/serw.wav"
    audio.play();
    // setTimeout(function test() {
    //   ballSpeedX = -4;
    //   ballSpeedY = 4;
    //   audio = new Audio();
    //   audio.src = "audio/serw.wav"
    //   audio.play();
    // }, 1000);

    }
  }

function startBallPosition() {
  if (ballSpeedX ==0 && ballSpeedY == 0) {
      ballY = playerY
    }
}
function opoznienie() {

  console.log('opoznienie');
}


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
  startBallPosition()
  serveAi()
  //setTimeout(serveAi(), 5000);
  // opoznienie()
  //score()
}

    setInterval(game,10);
