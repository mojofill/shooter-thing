import Bullet from "./bullet";
import Shooter from "./shooter";

const canvas = document.getElementById('canvas');
if (!canvas || !(canvas instanceof HTMLCanvasElement)) throw new Error('canvas not found');

const ctx = canvas.getContext('2d');
if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) throw new Error('ctx not found');

canvas.width = 800;
canvas.height = 700;

const time = {
    curr: new Date().getTime() / 1000,
    past: new Date().getTime() / 1000,
    get dt() {
        return this.curr - this.past > 0.3 ? 0 : this.curr - this.past;
    },
    update() {
        this.past = this.curr;
        this.curr = new Date().getTime() / 1000;
    }
}

const BACKGROUND_COLOR = 'black';

const SHOOTER_WIDTH = 10;
const SHOOTER_HEIGHT = 10; // try making it a rectangle yo
const SHOOTER_COLOR = 'white';
const SHOOTER_SPEED = 300;

const BULLET_LENGTH = 5; // bullets are squares, this all u need
const BULLET_SPEED = 400;
const BULLET_COLOR = 'white';

const PIXELATION_UNIT = 2;

const shooter: Shooter = new Shooter(canvas.width/2, canvas.height/2, SHOOTER_WIDTH, SHOOTER_HEIGHT, SHOOTER_COLOR);

const keys = { // false means the key is not held down
    w: false,
    a: false,
    s: false,
    d: false
};

const mouse = {
    clicked: false, // only shoot when the thing is CLICKED
    x: NaN,
    y: NaN
}

const addEventListeners = () => {
    window.addEventListener('keydown', e => { // show and explain why just putting the movement code in 'keydown' results in that pause/lag
        switch(e.key) {
            case "w":
                keys.w = true;
                break;
            case "a":
                keys.a = true;
                break;
            case "s":
                keys.s = true;
                break;
            case "d":
                keys.d = true;
                break;
        }
    });

    window.addEventListener('keyup', e => {
        switch(e.key) {
            case "w":
                keys.w = false;
                break;
            case "a":
                keys.a = false;
                break;
            case "s":
                keys.s = false;
                break;
            case "d":
                keys.d = false;
                break;
        }
    });

    window.addEventListener('mouseup', e => {
        mouse.clicked = true;
    });

    window.addEventListener('mousemove', e => {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY; // show them why u need offsetX/Y instead of just the regular x/y
    })
};

const processKeysAndMouse = () => {
    if (keys.w) shooter.y += SHOOTER_SPEED * time.dt;
    if (keys.a) shooter.x -= SHOOTER_SPEED * time.dt;
    if (keys.s) shooter.y -= SHOOTER_SPEED * time.dt;
    if (keys.d) shooter.x += SHOOTER_SPEED * time.dt;

    if (mouse.clicked) {
        // first get theta/direction from the mouse position to the shooter
        const theta = Math.atan2(ctx.canvas.height - mouse.y - shooter.y, mouse.x - shooter.x);
        const vx = BULLET_SPEED * Math.cos(theta);
        const vy = BULLET_SPEED * Math.sin(theta);
        shooter.addBullet(new Bullet(shooter.x, shooter.y, BULLET_LENGTH, BULLET_LENGTH, vx, vy, BULLET_COLOR));

        mouse.clicked = false; // reset it after we processed the click
    }
}

const init = () => {
    addEventListeners();

    requestAnimationFrame(loop);
};

const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time.update();
    
    processKeysAndMouse();

    shooter.renderBody(ctx, PIXELATION_UNIT);
    shooter.moveAndRenderBullets(ctx, time.dt, PIXELATION_UNIT);

    ctx.fillStyle = 'red';
    ctx.fillRect(mouse.x - 3, mouse.y - 3, 6, 6);

    requestAnimationFrame(loop);
};

init();
