import p5 from 'p5';
import { Sketch } from '../../../models';

export class Ball {
    radius: number = 10;

    position: p5.Vector;
    velocity: p5.Vector;

    constructor(
        public s: Sketch,
        public bounds: number
    ) {
        this.position = s.p5.createVector(0, 0, 0);
        this.velocity = s.p5.createVector(2, 4, 3);
    }

    update() {
        this.position.add(this.velocity);
    }

    render() {
        this.s.p5.push();
        this.s.p5.translate(this.position.x, this.position.y, this.position.z);
        this.s.p5.normalMaterial();
        this.s.p5.sphere(this.radius);
        this.s.p5.pop();
    }

    checkEdges() {
        const edgeHit = (val: number) => {
            if (
                val > this.bounds / 2 - this.radius ||
                val < -this.bounds / 2 + this.radius
            )
                return true;
            
            return false;
        }

        if (edgeHit(this.position.x))
            this.velocity.x *= -1;

        if (edgeHit(this.position.y))
            this.velocity.y *= -1;

        if (edgeHit(this.position.z))
            this.velocity.z *= -1;
    }
}