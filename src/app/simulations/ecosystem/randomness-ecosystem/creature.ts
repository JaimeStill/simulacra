import p5 from 'p5';
import { Chroma } from './chroma';
import { Limb } from './limb';

export class Creature {
    public chroma: Chroma;
    public radius: number;
    public limbs: Limb[] = [];
    public pos: p5.Vector;

    constructor(
        public s: p5,
        x: number,
        y: number
    ) {
        this.chroma = new Chroma(s);
        this.radius = s.floor(s.random(6, 12));
        this.pos = s.createVector(x, y);

        this.generateLimbs();
    }

    generateLimbs() {
        const count = this.s.floor(this.s.random(6, 12));

        for (let i = 0; i < count; i++) {
            let a = this.s.map(i, 0, count, 0, this.s.TWO_PI);
            let v = p5.Vector.fromAngle(a);
            v.mult(this.radius * 2);
            this.limbs[i] = new Limb(this.s, v);
        }

    }

    draw() {
        this.s.push();
        
        this.s.translate(this.pos.x, this.pos.y);
        for (let limb of this.limbs)
            limb.draw();

        this.s.fill(this.chroma.color);
        this.s.circle(0, 0, this.radius * 2);

        this.s.pop();
    }

    calculate(t: number, min: number, max: number) {
        return this.s.map(
            this.s.noise(t), 0, 1, min, max
        );
    }
}