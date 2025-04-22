import p5 from 'p5';
import { Theme } from '../../../models';

export class Ball {
    hue: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(
        public s: p5,
        public t: Theme,
        public mass: number,
        public cw: number,
        public ch: number
    ) {
        this.hue = s.floor(s.random(0, 360));

        this.position = s.createVector(
            s.random(this.radius(), cw - this.radius()),
            s.random(this.radius(), ch - this.radius())
        );

        this.velocity = s.createVector(
            this.calcVelocity(),
            this.calcVelocity()
        );

        this.acceleration = s.createVector(0, 0);
    }

    private calcVelocity = () =>
        this.s.random() > .5
            ? this.s.random(1, 3.1)
            : this.s.random(-3, -0.9);

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
        this.s.push();

        this.s.noStroke();
        this.s.fill(this.hue, 100, 70, .8);

        this.s.circle(
            this.position.x,
            this.position.y,
            this.size()
        );

        this.s.pop();
    }

    checkEdges() {
        if (this.position.x > this.cw)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.cw;

        if (this.position.y > this.ch)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.ch;
    }
}