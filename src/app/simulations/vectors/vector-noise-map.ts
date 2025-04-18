import p5 from 'p5';
import { Simulation } from '../simulation';

export class VectorNoiseMap extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const background: Background = new Background(
            s,
            this.width,
            this.height
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            s.noStroke();
        }

        s.draw = () => background.draw();
    }
}

class Background {
    pixelSize: number = 16;
    increment: number = 0.01;
    speed: number = 0.0;

    start: number;
    pos: p5.Vector;
    offset: p5.Vector;

    constructor(
        public s: p5,
        public width: number,
        public height: number
    ) {
        this.start = s.floor(s.random(0, 1000000));
        this.pos = s.createVector(0, 0);
        this.offset = s.createVector(this.start, this.start);
    }

    draw() {
        this.offset.x = this.start;
        for (this.pos.x = 0; this.pos.x < this.width; this.pos.x += this.pixelSize) {
            this.offset.y = this.start;

            for (this.pos.y = 0; this.pos.y < this.height; this.pos.y += this.pixelSize) {
                this.color();
                this.offset.y += this.increment;
            }

            this.offset.x += this.increment;
        }

        this.speed += this.increment;
    }

    color() {
        const generate = (min: number, max: number) =>
            this.s.map(
                this.s.noise(this.offset.x, this.offset.y, this.speed),
                0, 1,
                min, max
            );

        const hue = generate(0, 360);
        const sat = generate(70, 100);
        const lit = generate(30, 70);
        const alpha = generate(.3, .9);

        this.s.fill(
            this.s.color(hue, sat, lit, alpha)
        );

        this.s.square(this.pos.x, this.pos.y, this.pixelSize);
    }
}