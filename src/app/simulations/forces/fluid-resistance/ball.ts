import p5 from 'p5';
import { Sketch } from '../../../models';

export class Ball {
    hue: number;
    radius: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    gravity: p5.Vector;

    constructor(
        public s: Sketch,
        public mass: number
    ) {
        this.hue = s.p5.floor(s.p5.random(0, 161));

        this.radius = mass * 8;
        this.position = s.p5.createVector(
            s.p5.random(this.radius, s.width - this.radius),
            s.height / 4
        );

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
        this.gravity =s.p5.createVector(0, 0.1).mult(mass);
    }

    applyForce(force: p5.Vector): void {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update(): void {
        this.applyForce(this.gravity);
        this.checkEdges();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    render(): void {
        this.s.p5.push();

        this.s.p5.stroke(this.hue, 100, 50, 1);
        this.s.p5.strokeWeight(2);
        this.s.p5.fill(this.hue, 100, 50, .7);

        this.s.p5.circle(
            this.position.x,
            this.position.y,
            this.radius * 2
        );

        this.s.p5.pop();
    }

    checkEdges(): void {
        if (this.position.y > this.s.height - this.radius) {
            this.velocity.y *= -0.9;
            this.position.y = this.s.height - this.radius;
        }
    }
}