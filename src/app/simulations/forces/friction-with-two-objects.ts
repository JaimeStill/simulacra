import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class FrictionWithTwoObjects extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const wind: p5.Vector = s.createVector(0.5, 0);
        const balls: Ball[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initBalls();
        }

        s.draw = () => {
            s.background(this.theme.bg());

            balls.forEach(ball => {
                if (s.mouseIsPressed)
                    ball.applyForce(wind);

                ball.update();
                ball.render();
            });
        }

        const initBalls = () => {
            for (let i = 0; i < 4; i++)
                balls[i] = new Ball(
                    this.sketch(s),
                    s.floor(s.random(3, 10)),
                    s.random(0.05, 0.6)
                );
        }
    }
}

class Ball {
    hue: number;
    radius: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    gravity: p5.Vector;

    constructor(
        public s: Sketch,
        public mass: number,
        public frictionCoefficient: number
    ) {
        this.hue = s.p5.floor(s.p5.random(0, 360));

        this.radius = mass * 8;
        this.position = s.p5.createVector(
            s.p5.random(this.radius, s.width - this.radius),
            s.height / 2
        );

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
        this.gravity = s.p5.createVector(0, 0.1).mult(mass);
    }

    applyFriction() {
        if (this.contactEdge())
            this.applyForce(
                this.velocity
                    .copy()
                    .mult(-1)
                    .setMag(this.frictionCoefficient)
            );
    }

    applyForce(force: p5.Vector) {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.applyForce(this.gravity);
        this.applyFriction();
        this.bounceEdges();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    render() {
        this.s.p5.push();

        this.s.p5.stroke(this.s.theme.color());
        this.s.p5.strokeWeight(2);
        this.s.p5.fill(this.hue, 100, 60, .8);

        this.s.p5.circle(
            this.position.x,
            this.position.y,
            this.radius * 2
        );

        this.s.p5.pop();
    }

    contactEdge() {
        return this.position.y > this.s.height - this.radius - 1;
    }

    bounceEdges() {
        const bounce = -0.9;

        if (this.position.x > this.s.width - this.radius) {
            this.position.x = this.s.width - this.radius;
            this.velocity.x *= bounce;
        } else if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.x *= bounce;
        }

        if (this.position.y > this.s.height - this.radius) {
            this.position.y = this.s.height - this.radius;
            this.velocity.y *= bounce;
        } else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= bounce;
        }
    }
}