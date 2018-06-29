import {DEBUG} from "./wave";
import {ease} from "./easing";
import {RenderObjectInterface} from "./renderer";


export class Point implements RenderObjectInterface {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public render(canvas, context) {
        if (DEBUG) {
            context.beginPath();
            context.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
            context.fillStyle = 'red';
            context.fill();
        }
    }

    public update(canvas, context) {}
}


export class PointDefault extends Point implements RenderObjectInterface {
    public initial_y;
    public drift;
    public tk;
    public speed: number = 1;

    public constructor(x: number, y: number) {
        super(x, y);

        this.initial_y = y;
        this.drift = Math.round(Math.random()*10) + 40;
        this.tk = Math.round(Math.random()*100);
    }

    public update(canvas, context) {

        this.tk+=this.speed;

        let e = 0;

        if (this.tk <= 100)
            e = ease(this.tk, 0, 1, 100);
        else
            e = 1 - ease(this.tk - 100, 0, 1, 100);

        this.y = this.initial_y + this.drift * e;

        if (this.tk > 200)
            this.tk = 0;
    }
}