import p5 from 'p5';
import { Chroma } from './chroma';

export class Limb {
    public pos: p5.Vector;

    constructor(
        public s: p5,
        public chroma: Chroma,
        v: p5.Vector
    ) {
        this.pos = v.copy();
    }

    draw() {
        this.s.line(0, 0, this.pos.x, this.pos.y);
        this.s.fill(this.chroma.color);
        this.s.circle(this.pos.x, this.pos.y, 8);
    }
}