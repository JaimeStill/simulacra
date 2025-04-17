import p5 from 'p5';
import { Simulation } from '../simulation';

export class AnimatedNoiseMap extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const pixelSize = 24;
        const offset = 0.01;
        const start = s.floor(s.random(0, 100000));
        let speed = 0.0;

        function color(
            x: number,
            y: number,
            xoff: number,
            yoff: number
        ) {
            const hue = s.map(s.noise(xoff, yoff, speed), 0, 1, 0, 360);
            const sat = s.map(s.noise(xoff, yoff, speed), 0, 1, 60, 100);
            const lit = s.map(s.noise(xoff, yoff, speed), 0, 1, 20, 80);
            const alpha = s.map(s.noise(xoff, yoff, speed), 0, 1, .4, .8);
            const color = s.color(hue, sat, lit, alpha);
            s.fill(color);
            s.square(x, y, pixelSize);
        }

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            s.noStroke();

            // see: https://p5js.org/reference/p5/noiseDetail/
            // s.noiseDetail(6, .6);
        }

        s.draw = () => {
            let xoff = start;
            for (let x = 0; x < this.width - pixelSize; x += pixelSize) {
                let yoff = start;

                for (let y = 0; y < this.height - pixelSize; y += pixelSize) {
                    color(x, y, xoff, yoff);
                    yoff += offset;
                }

                xoff += offset;
            }

            speed += offset;
        }
    }
}