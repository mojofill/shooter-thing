export default class Bullet {
    constructor(public x: number, public y: number, public w: number, public h: number, public vx: number, public vy: number, public color: string) {}

    public render(ctx: CanvasRenderingContext2D, PIXELATION_UNIT: number) {
        const x = PIXELATION_UNIT * Math.floor((this.x - this.w/2) / PIXELATION_UNIT);
        const y = PIXELATION_UNIT * Math.floor((ctx.canvas.height - this.y - this.h/2) / PIXELATION_UNIT);

        ctx.fillRect(x, y, this.w, this.h);
    }

    public move(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
}