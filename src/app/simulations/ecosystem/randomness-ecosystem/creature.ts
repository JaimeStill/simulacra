import p5 from 'p5';
import { Chroma } from './chroma';
import { Limb } from './limb';

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
        public s: p5,
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
        this.chroma = new Chroma(s);

        this.age = 0;
        this.lifespan = s.floor(s.random(1000, 5000));

        this.radius = s.floor(s.random(12, 24));
        this.size = (this.radius * 6) + 16;

        this.bx = this.width - this.size;
        this.by = this.height - this.size;
        this.tx = s.floor(s.random(0, 100000));
        this.ty = s.floor(s.random(0, 100000));

        this.generateLimbs();
    }

    generateLimbs() {
        const count = this.s.floor(this.s.random(12, 24));
        for (let i = 0; i < count; i++) {
            let a = this.s.map(i, 0, count, 0, this.s.TWO_PI);
            let v = p5.Vector.fromAngle(a);
            v.mult(this.radius * 2);
            this.limbs[i] = new Limb(this.s, this.chroma, v);
        }
    }

    draw() {
        this.s.push();

        this.age++;
        
        this.s.translate(this.x, this.y);
        for (let limb of this.limbs)
            limb.draw();

        this.s.fill(this.chroma.color);
        this.s.circle(0, 0, this.radius * 2);

        this.s.pop();
    }

    move() {
        this.x += this.calculate(this.tx);
        this.y += this.calculate(this.ty);

        this.x = this.s.constrain(
            this.x,
            this.size,
            this.bx
        );

        this.y = this.s.constrain(
            this.y,
            this.size,
            this.by
        );

        this.tx += 0.001;
        this.ty += 0.001;
    }

    calculate(t: number) {
        return this.s.map(
            this.s.noise(t),
            0, 1,
            -0.6, 0.6
        );
    }
}