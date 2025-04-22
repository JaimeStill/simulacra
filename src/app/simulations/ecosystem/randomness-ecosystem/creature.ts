import p5 from 'p5';
import { Chroma } from './chroma';
import { Limb } from './limb';
import { Sketch } from '../../../models';

export class Creature {
    chroma: Chroma;

    age: number;
    lifespan: number;

    radius: number;
    size: number;

    bx: number;
    by: number;
    tx: number;
    ty: number;

    limbs: Limb[] = [];

    constructor(
        public s: Sketch,
        public x: number,
        public y: number
    ) {
        this.chroma = new Chroma(s.p5);

        this.age = 0;
        this.lifespan = s.p5.floor(s.p5.random(1000, 5000));

        this.radius = s.p5.floor(s.p5.random(12, 24));
        this.size = (this.radius * 6) + 16;

        this.bx = this.s.width - this.size;
        this.by = this.s.height - this.size;
        this.tx = s.p5.floor(s.p5.random(0, 100000));
        this.ty = s.p5.floor(s.p5.random(0, 100000));

        this.generateLimbs();
    }

    generateLimbs() {
        const count = this.s.p5.floor(this.s.p5.random(12, 24));
        for (let i = 0; i < count; i++) {
            let a = this.s.p5.map(i, 0, count, 0, this.s.p5.TWO_PI);
            let v = p5.Vector.fromAngle(a);
            v.mult(this.radius * 2);
            this.limbs[i] = new Limb(this.s.p5, this.chroma, v);
        }
    }

    draw() {
        this.s.p5.push();

        this.age++;
        
        this.s.p5.translate(this.x, this.y);
        for (let limb of this.limbs)
            limb.draw();

        this.s.p5.fill(this.chroma.color);
        this.s.p5.circle(0, 0, this.radius * 2);

        this.s.p5.pop();
    }

    move() {
        this.x += this.calculate(this.tx);
        this.y += this.calculate(this.ty);

        this.x = this.s.p5.constrain(
            this.x,
            this.size,
            this.bx
        );

        this.y = this.s.p5.constrain(
            this.y,
            this.size,
            this.by
        );

        this.tx += 0.001;
        this.ty += 0.001;
    }

    calculate(t: number) {
        return this.s.p5.map(
            this.s.p5.noise(t),
            0, 1,
            -0.6, 0.6
        );
    }
}