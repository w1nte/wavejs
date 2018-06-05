/**
 * w1nte (c)
 * 5/25/2018
 */

import {Renderer, RenderObject} from "./renderer";
import {ease} from "./easing";

export const DEBUG:boolean = false;

/**
 * Core class
 */
export class Wave {
    private renderer: Renderer;

    private defaultConfig: object = {
        waves: [
            {
                backgroundColor: 'white',
                strokeColor: false,
                speed: 2,
                distance: 200
            },
            {
                backgroundColor: false,
                strokeColor: 'white',
                strokeWidth: 5,
                speed: 2,
                distance: 200
            },
            {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                strokeColor: false,
                speed: 2,
                distance: 200
            },
        ]
    };

    private config: object;

    private waves: Array<WaveController> = Array();

    public constructor(canvas_id: string, config?: object) {

        this.renderer = new Renderer(canvas_id);
        this.renderer.start();

        this.config = this.defaultConfig; // TODO: config assign

        this.setup();

        this.addEventListeners();
    }

    public setup() {
        this.renderer.flushRenderObjects();

        for (let wave_config of this.config['waves']) {
            let new_wave = new WaveController(this, this.renderer, wave_config);
            this.waves.push(new_wave);
            this.renderer.addRenderObject(new_wave);
        }
    }

    public addEventListeners(): void {
        window.addEventListener("resize", () => {
            this.renderer.updateCanvasSize();
            this.setup(); //flush and run again
        })
    }

}

class Point {
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public update(canvas, context) {}
}


class WavePoint extends Point {
    public initial_y;
    public drift;
    public tk;

    public constructor(x: number, y: number) {
        super(x, y);

        this.initial_y = y;
        this.drift = Math.round(Math.random()*10) + 40;
        this.tk = Math.round(Math.random()*100);
    }

    public update(canvas, context) {

        this.tk+=1;

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


class WaveController implements RenderObject {

    public config:object;

    private points: Array<Point> = Array();

    private wave: Wave;

    private renderer: Renderer;


    private threshold;


    public constructor(wave: Wave, renderer: Renderer, config: object) {
        this.wave = wave;
        this.renderer = renderer;
        this.config = config;

        let number = Math.floor(renderer.canvas.width / this.config['distance']);
        let threshold = (renderer.canvas.width - (number * this.config['distance']));

        this.threshold = threshold;

        console.log(this.threshold);

        for (let i = -2; i < number + 2; i++) {
            this.points.push(new WavePoint(this.config['distance'] * i, renderer.canvas.height / 2));
        }
    }

    public render(canvas, context) {
        context.beginPath();
        let points_count = this.points.length;
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 0; i < points_count - 1; i++) {
            let c = (this.points[i].x + this.points[i + 1].x) / 2;
            let d = (this.points[i].y + this.points[i + 1].y) / 2;
            context.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
        }

        this.logic(canvas, context);

        context.lineTo(this.points[points_count - 1].x, this.points[points_count - 1].y);
        context.lineTo(this.points[points_count - 1].x, canvas.height + 100);
        context.lineTo(this.points[0].x, canvas.height + 100);
        context.closePath();
        if (this.config['backgroundColor']) {
            context.fillStyle = this.config['backgroundColor'];
            context.fill();
        }
        if (this.config['strokeColor']) {
            context.strokeStyle = this.config['strokeColor'];
            if (this.config['strokeWidth'])
                context.lineWidth = this.config['strokeWidth'];
            context.stroke();
        }

        if (DEBUG)
            for (let point of this.points) {
                context.beginPath();
                context.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
                context.fillStyle = 'red';
                context.fill();
            }
    }

    public logic(canvas, context) {
        for (let p of this.points) {
            p.update(canvas, context);
            p.x += this.config['speed'];
        }

        let last_p = this.points[this.points.length-1];

        if (this.points[this.points.length-2].x > canvas.width + this.config['distance']) {
            last_p.x = Math.round(-this.config['distance'] * 2 +this.threshold);
            this.points.unshift(this.points.pop());
        }
    }
}

export default Wave;