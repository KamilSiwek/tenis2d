console.log('ready');

var cal = document.getElementsByName('body');
var canvas = document.getElementById('tenis-pool');


var ctx = canvas.getContext('2d');



var ww = window.innerWidth;
var wh = window.innerHeight;

function wymiaryCanvas() {

}
canvas.width = ww * 0.7;
canvas.height = ww * 0.35;
var cw = canvas.width;
var ch = canvas.height;

var ballSize = cw/40;
// let ballX = cw/2 - ballSize/2;
// let ballY = ch/2 - ballSize/2;



  //Wymiary i pozycja paletek:
var paddelWidth = cw/40;
var paddelHeight = ch/4;

var playerX = 0.1 * cw;
var aiX = 0.9 * cw - paddelWidth;

var playerY = ch/2 - paddelHeight/2;
var aiY = ch/2 - paddelHeight/2;

var playerSpeed = 0;


var centerLineWidth = ww * 0.005;
var centerLineHeight = ww * 0.015;

  //Wymiary i pozycja początkowa piłki:
var ballSpeedX = 0;
var ballSpeedY = 0;

var ballX = playerX + ballSize;
var ballY = playerY + ballSize;

// var ballX = playerX;
// var ballY = playerY -150;


  //Wymiary i pozycja przycisków sterowania:
// var buttonSize = cw * 0.1;
// var buttonUpX = 0;
// var buttonUpY = ch - buttonSize;
// var buttonDownX = cw - buttonSize;
// var buttonDownY = ch - buttonSize;



  //Funkcja przycisków sterowania:
// function buttonUp() {
//   ctx.fillStyle = 'red';
//   ctx.fillRect(buttonUpX, buttonUpY, buttonSize, buttonSize);
// }
// function buttonDown() {
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(buttonDownX, buttonDownY, buttonSize, buttonSize);
// }

var upButton = document.getElementById('up');
var downButton = document.getElementById('down');
function player(){
  ctx.fillStyle= '#fff';
  ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
  playerY += playerSpeed;
  //function up() {
    // if(cw<= 700){
    //   upButton.onclick = function(){
    //     playerSpeed += 0.01;
    //     playerY -= playerSpeed;
    //   }

      //console.log('up');
      if (playerY <= 0) {
        playerY = 0;
      }
      if (playerY >= ch - paddelHeight) {
            playerY = ch - paddelHeight
      }
    //}
  }

function up() {
  playerSpeed = 0;
  if(ballSpeedX > 0){
    playerSpeed -= ballSpeedX/2;
  }
  if (ballSpeedX < 0) {
    playerSpeed += ballSpeedX/2;
  }
}
function down() {
  playerSpeed = 0;
  if (ballSpeedX > 0) {
    playerSpeed += ballSpeedX/2;
  }
  if (ballSpeedX < 0) {
    playerSpeed -= ballSpeedX/2;
  }

}

function keyControl(e) {
  switch (e.keyCode) {
    case 38:
    playerSpeed = 0;
    console.log('keyUp');
    if(ballSpeedX > 0){
      playerSpeed -= ballSpeedX/2;
    }
    if (ballSpeedX < 0) {
      playerSpeed += ballSpeedX/2;
    }
      break;
  }
  switch (e.keyCode) {
    case 40:
    playerSpeed = 0;
    console.log('keydown');
    if (ballSpeedX > 0) {
      playerSpeed += ballSpeedX/2;
    }
    if (ballSpeedX < 0) {
      playerSpeed -= ballSpeedX/2;
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

//}
//upButton.addEventListener("click", player);
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
    audio.play();e
    ballX = playerX + ballSize

    aiPkt += 1;
    document.getElementById('AI-score').innerText=aiPkt.length;
  }
//  var audio;
  if (ballX  >= playerX && ballX  <= playerX + paddelWidth && ballY > playerY && ballY < playerY + paddelHeight) { //Odbicie piłki od rakietki gracza
    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie1.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }
  //  speedUp()
  }
  if (ballX + ballSize >= aiX && ballX <= aiX + paddelWidth && ballY > aiY - paddelHeight/8 && ballY < aiY + paddelHeight) { // Odbicie piłki od rakietki AI

    ballSpeedX = -ballSpeedX
    audio = new Audio();
    audio.src = "audio/odbicie2.wav"
    if (ballSpeedY != 0 && ballSpeedX!=0) {
      audio.play();
    }

    speedUp()
  }
  //return pkt;
}
console.log(ball());

function speed() {
  console.log(ballSpeedX);
  console.log(ballSpeedY);
}

topCanvas = canvas.offsetTop;
console.log(topCanvas);

//Poruszanie graczem:
function playerPosition(e){
  if(cw > 700){
    playerY = e.clientY - topCanvas - paddelHeight/2;
  }

  //playerY = e.touches[1].screenY;
  if (playerY <= 0) {
    playerY = 0;
  }
  if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
  }
}

canvas.addEventListener("mousemove", playerPosition);

//Ruch AI:
function AIPosition(){
  var middleBall = ballY + ballSize/2;
  var middlePaddel = aiY + paddelHeight/2;
  if(ballX > cw/2){
    if(middlePaddel - middleBall > ch/3){
      aiY -= cw/35;
    }
    else if (middlePaddel - middleBall > ch/10) {
      aiY -= cw/80;
    }
    else if (middlePaddel - middleBall < -(ch/3)) {
      aiY += cw/35;
    }
    else if (middlePaddel - middleBall < -(ch/10)) {
      aiY += cw/80;
    }
  }
  if (ballX <= cw/2 && ballX > cw/10) {
     if (middlePaddel - middleBall > ch/4) {
       aiY -= cw/300;
     }
     if (middlePaddel - middleBall < -(ch/10)) {
       aiY += cw/300;
     }
   }
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
    }
  }

function startBallPosition() {
  if (ballSpeedX ==0 && ballSpeedY == 0) {
      ballY = playerY
    }
}



// var myScore;
//
// function Score() {
//   myScore = new component("30px", "Consolas", "white", 280, 40, "text");
// }
// Score()
//Wywoływanie funkcji:

function game(){
  //wymiaryCanvas()
  pool()
  // buttonUp()
  // buttonDown()
  ball()
  player()
  ai()
  AIPosition()
  startBallPosition()
  serveAi()
}

    setInterval(game,1000/60);
