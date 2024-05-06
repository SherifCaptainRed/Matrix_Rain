const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
  CLASS CONSTRUCTOR
    whenever we use the 'new' keyword constructor will create 1 new blank object and it will fill it with values and properties based on the class blueprint. 
*/



// will create all types of symbol 
class Symbol {
  constructor(x, y, fontSize, canvasHeight) {//automatically triggered
    this.character = '0123456789*ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-+=><:;#!'
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.character.charAt(Math.floor(Math.random() * this.character.length));
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

// makes different effect for all symbol at once
class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);

    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

function writeText(){
  ctx.textAlign = 'center';

  ctx.font = '30px Rubik Scribble';
  ctx.fillStyle = 'white';
  ctx.fillText('Made on',canvas.width/2,(canvas.height/100)*40);

  ctx.font = '100px Rubik Scribble';
  ctx.strokeStyle = 'white';
  ctx.strokeText('04 March 2024',canvas.width/2,canvas.height/2);

  ctx.font = '55px Rubik Scribble';
  ctx.fillStyle = 'white';
  ctx.fillText('Ansh Kumar Tripathi',canvas.width/2,(canvas.height/100)*60);
  
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    // let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2,100,canvas.width/2, canvas.height/2,canvas.width/2);
    // gradient.addColorStop(0, 'red');
    // gradient.addColorStop(0.2, 'orange');
    // gradient.addColorStop(0.4, 'yellow');
    // gradient.addColorStop(0.6, 'green');
    // gradient.addColorStop(0.8, 'blue');
    // gradient.addColorStop(1, 'magenta');

    ctx.fillStyle = '#0aff0a';//gradient; 
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  writeText();
  requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
  effect.resize(canvas.width, canvas.height);
});