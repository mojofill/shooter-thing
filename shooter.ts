import Bullet from "./bullet";

export default class Shooter {
    public bullets: Bullet[] = [];
    constructor(public x: number, public y: number, public w: number, public h: number, public color: string) {}

    public renderBody(ctx: CanvasRenderingContext2D, PIXELATION_UNIT: number) {
        const x = PIXELATION_UNIT * Math.floor((this.x - this.w/2) / PIXELATION_UNIT);
        const y = PIXELATION_UNIT * Math.floor((ctx.canvas.height - this.y - this.h/2) / PIXELATION_UNIT);

        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.w, this.h);
    }

    public moveAndRenderBullets(ctx: CanvasRenderingContext2D, dt: number, PIXELATION_UNIT: number) {
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].render(ctx, PIXELATION_UNIT);
            this.bullets[i].move(dt);
        }
    }

    public addBullet(bullet: Bullet) {
        this.bullets.push(bullet);
    }

    public removeBullet(index: number) {
        this.bullets.splice(index, 1); // removes one element at that index, which means that the element at that index gets removed
    }
}