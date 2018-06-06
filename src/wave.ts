/**
 * w1nte (c)
 * 5/25/2018
 */

import {Renderer} from "./renderer";
import {Controller} from "./controller";
import {Config} from "./config";

export const DEBUG:boolean = false;

/**
 * Core class
 */
export class wave {
    public static defaultConfig: object = {

    };

    private renderer: Renderer;

    private config: Config;

    private waves: Array<Controller> = Array();

    public constructor(canvas_id: string, config?: object) {

        this.renderer = new Renderer(canvas_id);
        this.renderer.start();

        this.config = new Config(wave.defaultConfig, config);

        this.setup();

        this.addEventListeners();
    }

    public setup() {
        this.renderer.flushRenderObjects();

        let waves = this.config.get('waves');

        if (waves)
            for (let config of waves) {
                let new_wave = new Controller(this.renderer, config);
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