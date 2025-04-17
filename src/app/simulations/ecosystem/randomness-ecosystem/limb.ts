import p5 from 'p5';
import { Chroma } from './chroma';

export class Limb {
    public pos: p5.Vector;
    public chroma: Chroma;

    constructor(public s: p5, v: p5.Vector) {
        this.pos = v.copy();
        this.chroma = new Chroma(s);
    }

    draw() {
        this.s.line(0, 0, this.pos.x, this.pos.y);
        this.s.fill(this.chroma.color);
        this.s.circle(this.pos.x, this.pos.y, 8);
    }
}