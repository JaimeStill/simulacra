import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class PaintSplatter extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        let fc = 0;

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.frameRate(10);
            s.background(this.theme.bg());
        }

        s.draw = () => {
            fc += 0.1;
            const splatter = new Splatter(this.sketch(s));
            splatter.draw(fc);
        }
    }
}

class Splatter {
    x: number;
    y: number;
    radius: number;
    sprays: Sprays;

    constructor(public s: Sketch) {
        const canvasCenterX = s.width / 2;
        const canvasCenterY = s.height / 2;
        const std = 120;

        this.x = s.p5.randomGaussian(canvasCenterX, std);
        this.y = s.p5.randomGaussian(canvasCenterY, std);

        this.radius = s.p5.random(12, 28);

        this.sprays = new Sprays(s, this.x, this.y, this.radius);
    }

    draw(fc: number) {
        this.s.p5.push();

        this.color();
        this.trace(fc);

        this.sprays.draw();

        this.s.p5.pop();
    }

    color() {
        const h = this.s.p5.floor(this.s.p5.random(0, 360));
        const s = this.s.p5.floor(this.s.p5.random(30, 101));
        const l = this.s.p5.floor(this.s.p5.random(30, 61));
        const a = this.s.p5.random(.6, .9);

        this.s.p5.noStroke();
        this.s.p5.fill(this.s.theme.hsla(h, s, l, a));
    }

    trace(fc: number) {
        this.s.p5.beginShape();

        const steps = this.s.p5.floor(this.s.p5.random(32, 46));
        const points: { x: number, y: number }[] = [];

        for (let i = 0; i < steps; i++) {
            const angle = (i % steps) / steps * this.s.p5.TWO_PI;

            const radV = this.s.p5.map(
                this.s.p5.noise(
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

        this.s.p5.curveVertex(points[points.length - 2].x, points[points.length - 2].y);

        for (const pt of points)
            this.s.p5.curveVertex(pt.x, pt.y);

        this.s.p5.endShape(this.s.p5.CLOSE);
    }
}

class Sprays {
    count: number;

    distances: number[] = [];
    thicknesses: number[] = [];
    angles: number[] = [];

    constructor(
        public s: Sketch,
        public x: number,
        public y: number,
        public radius: number
    ) {
        this.count = s.p5.floor(s.p5.random(20, 80));

        for (let i = 0; i < this.count; i++) {
            this.distances.push(
                s.p5.random(0.8, 1.5) * s.p5.floor(s.p5.random(radius, radius + 30))
            );

            this.thicknesses.push(s.p5.random(1, 3));
            this.angles.push(s.p5.random(0, s.p5.TWO_PI));
        }
    }

    draw() {
        for (let i = 0; i < this.count; i++) {
            const angle = this.angles[i];
            const distance = this.distances[i];
            const thickness = this.thicknesses[i];

            const sprayX = this.x + Math.cos(angle) * distance;
            const sprayY = this.y + Math.sin(angle) * distance;

            this.s.p5.noStroke();
            this.s.p5.ellipse(sprayX, sprayY, thickness, thickness);
        }
    }
}