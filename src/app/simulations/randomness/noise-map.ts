import p5 from 'p5';
import { Simulation } from '../simulation';

export class NoiseMap extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const offset = 0.01;
        const start = s.floor(s.random(0, 100000));

        function color(
            x: number,
            y: number,
            xoff: number,
            yoff: number
        ) {
            const hue = s.map(s.noise(xoff, yoff), 0, 1, 0, 360);
            const sat = s.map(s.noise(xoff, yoff), 0, 1, 60, 100);
            const lit = s.map(s.noise(xoff, yoff), 0, 1, 20, 80);
            const alpha = s.map(s.noise(xoff, yoff), 0, 1, .4, .8);
            const color = s.color(hue, sat, lit, alpha);
            s.set(x, y, color);
        }

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);

            s.loadPixels();

            let xoff = start;
            for (let x = 0; x < this.width; x++) {
                let yoff = start;

                for (let y = 0; y < this.height; y++) {
                    color(x, y, xoff, yoff);
                    yoff += offset;
                }

                xoff += offset;
            }

            s.updatePixels();
            s.noLoop();
        }
    }
}