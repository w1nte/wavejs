import {DEBUG} from "./wave";
import {Renderer, RenderObjectInterface} from "./renderer";
import {PointDefault, Point} from "./points";
import {Config} from "./config";


export class Controller implements RenderObjectInterface {
    
    public static defaultConfig: object = {
        //backgroundColor: 'white',
        //strokeColor: false,
        speed: 0,
        distance: 500,
        type: 'default',
        drift: 10,
        upsidedown: false
    };

    public config: Config;

    private points: Array<Point> = Array();

    private renderer: Renderer;


    private threshold;


    public constructor(renderer: Renderer, config: object) {
        this.renderer = renderer;
        this.config = new Config(Controller.defaultConfig, config);

        //console.log(this.config.getConfig());

        this.generate();
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

        let fh = canvas.height + this.config.get('strokeWidth', 1) * 2;
        if (this.config.get('upsidedown'))
            fh = - this.config.get('strokeWidth', 1) * 2;

        context.lineTo(this.points[points_count - 1].x, fh);
        context.lineTo(this.points[0].x, fh);

        context.closePath();

        if (this.config.get('backgroundColor')) {
            context.fillStyle = this.config.get('backgroundColor');
            context.fill();
        }

        if (this.config.get('strokeColor')) {
            context.strokeStyle = this.config.get('strokeColor');
            if (this.config.get('strokeWidth'))
                context.lineWidth = this.config.get('strokeWidth');
            context.stroke();
        }

        for (let point of this.points) {
            point.render(canvas, context);
        }
    }

    public logic(canvas, context) {
        let speed = this.config.get('speed', 0);

        // update & move points
        for (let p of this.points) {
            p.update(canvas, context);
            p.x += speed
        }


        let last_p = this.points[this.points.length-1],
            first_p = this.points[0];

        if (speed > 0) {
            if (this.points[this.points.length-2].x > canvas.width + this.config.get('distance')) {
                last_p.x = Math.round(-this.config.get('distance') * 2 + this.threshold);
                this.points.unshift(this.points.pop());
            }
        } else if (speed < 0) {
            if (this.points[1].x < - this.config.get('distance')) {
                first_p.x = Math.round(canvas.width + this.config.get('distance') * 2 - this.threshold);
                this.points.push(this.points.shift());
            }
        }
    }

    public generate() {
        let number = Math.floor(this.renderer.canvas.width / this.config.get('distance'));
        this.threshold = (this.renderer.canvas.width - (number * this.config.get('distance')));

        for (let i = -2; i < number + 2; i++) {
            let point = new PointDefault(this.config.get('distance') * i, this.renderer.canvas.height / 2);
            point.drift = this.config.get('drift', 10);
            this.points.push(point);
        }
    }
}