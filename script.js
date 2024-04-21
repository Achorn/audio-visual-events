const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
let canvasPos = canvas.getBoundingClientRect();
const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.x = x;
    this.y = y;
    //multiplying is more performative than dividing
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.image = new Image();
    this.image.src = "./assets/boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "/assets/boom.wav";
  }
  update() {
    if (this.frame === 0) this.sound.play();
    this.timer++;
    if (this.timer % 6 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", (e) => {
  createAnimation(e);
});

// window.addEventListener("mousemove", (e) => {
//   createAnimation(e);
// });
// window.addEventListener("mousedown", (e) => createAnimation(e));

const createAnimation = (e) => {
  let positionX = e.x - canvasPos.left;
  let positionY = e.y - canvasPos.top;
  explosions.push(new Explosion(positionX, positionY));
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);

      i--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
