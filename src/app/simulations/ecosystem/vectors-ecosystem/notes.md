# Notes

## Pulsing Limbs

```ts
import p5 from 'p5';
import { Chroma } from './chroma';

export class Limb {
    pos: p5.Vector;
    pulseRate: number;
    max: number;
    min: number;
    growing: boolean = true;

    constructor(
        public s: p5,
        public chroma: Chroma,
        v: p5.Vector
    ) {
        this.pos = v.copy();
        this.pulseRate = 1.01;
        const mag = this.pos.mag();

        this.max = s.random(
            mag + 4,
            mag + 8
        );

        this.min = s.random(
            mag - 4,
            mag - 8
        );
    }

    grow() {
        const mag = this.pos.mag();

        if (mag >= this.max)
            this.growing = false;
        else if (mag <= this.min)
            this.growing = true;
        
        if (this.growing)
            this.pos.mult(this.pulseRate);
        else
            this.pos.div(this.pulseRate);
    }

    draw() {
        this.grow();
        this.s.line(0, 0, this.pos.x, this.pos.y);
        this.s.fill(this.chroma.color);
        this.s.circle(this.pos.x, this.pos.y, 8);
    }
}
```