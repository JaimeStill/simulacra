import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class VectorNoiseMap extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const background: Background = new Background(this.sketch(s));

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

    constructor(public s: Sketch) {
        this.start = s.p5.floor(s.p5.random(0, 1000000));
        this.pos = s.p5.createVector(0, 0);
        this.offset = s.p5.createVector(this.start, this.start);
    }

    draw() {
        this.offset.x = this.start;
        for (this.pos.x = 0; this.pos.x < this.s.width; this.pos.x += this.pixelSize) {
            this.offset.y = this.start;

            for (this.pos.y = 0; this.pos.y < this.s.height; this.pos.y += this.pixelSize) {
                this.color();
                this.offset.y += this.increment;
            }

            this.offset.x += this.increment;
        }

        this.speed += this.increment;
    }

    color() {
        const generate = (min: number, max: number) =>
            this.s.p5.map(
                this.s.p5.noise(this.offset.x, this.offset.y, this.speed),
                0, 1,
                min, max
            );

        const hue = generate(0, 360);
        const sat = generate(70, 100);
        const lit = generate(30, 70);
        const alpha = generate(.3, .9);

        this.s.p5.fill(
            this.s.p5.color(hue, sat, lit, alpha)
        );

        this.s.p5.square(this.pos.x, this.pos.y, this.pixelSize);
    }
}