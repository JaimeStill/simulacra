import p5 from 'p5';
import { Sketch } from '../../../models';

export class Ball {
    hue: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(
        public s: Sketch,
        public mass: number
    ) {
        this.hue = s.p5.floor(s.p5.random(0, 360));

        this.position = s.p5.createVector(
            s.p5.random(this.radius(), s.width - this.radius()),
            s.p5.random(this.radius(), s.height - this.radius())
        );

        this.velocity = s.p5.createVector(
            this.calcVelocity(),
            this.calcVelocity()
        );

        this.acceleration = s.p5.createVector(0, 0);
    }

    private calcVelocity = () =>
        this.s.p5.random() > .5
            ? this.s.p5.random(1, 3.1)
            : this.s.p5.random(-3, -0.9);

    size = (): number => this.mass * 16;
    radius = (): number => this.size() / 2;

    applyForce(force: p5.Vector) {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    render() {
        this.s.p5.push();

        this.s.p5.noStroke();
        this.s.p5.fill(this.hue, 100, 70, .8);

        this.s.p5.circle(
            this.position.x,
            this.position.y,
            this.size()
        );

        this.s.p5.pop();
    }

    checkEdges() {
        if (this.position.x > this.s.width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.s.width;

        if (this.position.y > this.s.height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.s.height;
    }
}