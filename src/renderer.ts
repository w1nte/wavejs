export interface RenderObject {
    render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D);
}

/**
 * Rendering class
 */
export class Renderer {
    public static requestAnimFrame: Function = () => {
        return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               function (a) {
                    window.setTimeout(a, 1E3 / 60)
               }
    };

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    public is_running: boolean = false;

    private renderObjects: Array<RenderObject> = [];


    public constructor(canvas_id: string) {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvas_id);
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.updateCanvasSize();
    }

    public updateCanvasSize(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public start(): void {
        this.is_running = true;
        this.loop();
    }

    public stop(): void {
        this.is_running = false;
    }

    public addRenderObject(renderObject: RenderObject): void {
        this.renderObjects.push(renderObject);
    }

    public flushRenderObjects(): void {
        this.renderObjects = Array();
    }

    public getRenderObjects(): Array<RenderObject> {
        return this.renderObjects;
    }

    private loop(): void {
        this.clear();

        for (let obj of this.renderObjects) {
            obj.render(this.canvas, this.context);
        }

        if (this.is_running)
            Renderer.requestAnimFrame()(this.loop.bind(this));
    }
}