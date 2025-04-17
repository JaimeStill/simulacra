import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class PaintSplatter extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        let fc = 0;

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.frameRate(8);
            s.background(this.theme.bg());
        }

        s.draw = () => {
            fc += 0.1;
            const splatter = new Splatter(s, this.theme, this.width, this.height);
            splatter.draw(fc);
        }
    }
}

class Splatter {
    x: number;
    y: number;
    radius: number;
    sprays: Sprays;

    constructor(
        public s: p5,
        public t: Theme,
        public canvasWidth: number,
        public canvasHeight: number
    ) {
        const canvasCenterX = canvasWidth / 2;
        const canvasCenterY = canvasHeight / 2;
        const std = Math.min(canvasWidth, canvasHeight) * 0.15;
        console.log(std);

        this.x = s.randomGaussian(canvasCenterX, std);
        this.y = s.randomGaussian(canvasCenterY, std);

        this.radius = s.random(20, 32);

        this.sprays = new Sprays(s, t, this.x, this.y, this.radius);
    }

    draw(fc: number) {
        this.s.push();

        this.color();
        this.trace(fc);

        this.sprays.draw();

        this.s.pop();
    }

    color() {
        const h = this.s.floor(this.s.random(0, 361));
        const s = this.s.floor(this.s.random(30, 101));
        const l = this.s.floor(this.s.random(30, 61));
        const a = this.s.random(.6, .9);

        this.s.noStroke();
        this.s.fill(this.t.hsla(h, s, l, a));
    }

    trace(fc: number) {
        this.s.beginShape();

        const steps = this.s.floor(this.s.random(32, 46));
        const points: { x: number, y: number }[] = [];

        for (let i = 0; i < steps; i++) {
            const angle = (i % steps) / steps * this.s.TWO_PI;

            const radV = this.s.map(
                this.s.noise(
                    Math.cos(angle) * fc,
                    Math.sin(angle) * fc + 10000
                ),
                0, 1,
                0.7, 1.3
            );

            const x = this.x + Math.cos(angle) * this.radius * radV;
            const y = this.y + Math.sin(angle) * this.radius * radV;
            points.push({ x, y });
        }

        points.push(points[0]);
        points.push(points[1]);

        this.s.curveVertex(points[points.length - 2].x, points[points.length - 2].y);

        for (const pt of points)
            this.s.curveVertex(pt.x, pt.y);

        this.s.endShape(this.s.CLOSE);
    }
}

class Sprays {
    count: number;

    distances: number[] = [];
    thicknesses: number[] = [];
    angles: number[] = [];

    constructor(
        public s: p5,
        public t: Theme,
        public x: number,
        public y: number,
        public radius: number
    ) {
        this.count = s.floor(s.random(20, 80));

        for (let i = 0; i < this.count; i++) {
            this.distances.push(
                s.random(0.8, 1.5) * radius
            );

            this.thicknesses.push(s.random(1, 3));
            this.angles.push(s.random(0, s.TWO_PI));
        }
    }

    draw() {
        for (let i = 0; i < this.count; i++) {
            const angle = this.angles[i];
            const distance = this.distances[i];
            const thickness = this.thicknesses[i];

            const sprayX = this.x + Math.cos(angle) * distance;
            const sprayY = this.y + Math.sin(angle) * distance;

            this.s.noStroke();
            this.s.ellipse(sprayX, sprayY, thickness, thickness);
        }
    }
}