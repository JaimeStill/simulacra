import p5 from 'p5';
import { Chroma } from './chroma';

export class Limb {
    pos: p5.Vector;
    growth: p5.Vector;
    magnitude: number;
    max: number;

    constructor(
        public s: p5,
        public chroma: Chroma,
        v: p5.Vector
    ) {
        this.pos = v.copy();
        this.growth = s.createVector(0.01, 0.01);
        this.magnitude = this.pos.mag();

        this.max = s.random(
            this.magnitude + 4,
            this.magnitude + 8
        );
    }

    draw() {
        this.s.line(0, 0, this.pos.x, this.pos.y);
        this.s.fill(this.chroma.color);
        this.s.circle(this.pos.x, this.pos.y, 8);
    }
}