console.log('ready');

const canvas = document.getElementById('tenis-pool');
//const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
var cw = canvas.width;
var ch = canvas.height;

function pool() {
  //boisko
  ctx.fillStyle = 'orange';
  ctx.fillRect(0,0,cw,ch);
  //Siatka na środku
}
pool()
