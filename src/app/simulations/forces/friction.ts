import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class Friction extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const gravity: p5.Vector = s.createVector(0, 1);
        const wind: p5.Vector = s.createVector(0.5, 0);
        const ball: Ball = new Ball(this.sketch(s), 5);

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.background(this.theme.bg()); 
            
            ball.applyForce(gravity);
            
            if (s.mouseIsPressed)
                ball.applyForce(wind);

            if (ball.contactEdge()) {
                let c = 0.1;
                let friction = ball.velocity.copy();
                friction.mult(-1);
                friction.setMag(c);

                ball.applyForce(friction);
            }

            ball.bounceEdges();
            ball.update();
            ball.render();
        }
    }
}

class Ball {
    radius: number;
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(
        public s: Sketch,
        public mass: number
    ) {
        this.radius = mass * 8;
        this.position = s.p5.createVector(
            s.width / 2,
            s.height / 2
        );

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
    }

    applyForce(force: p5.Vector) {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    render() {
        this.s.p5.push();

        this.s.p5.stroke(this.s.theme.green2());
        this.s.p5.strokeWeight(2);
        this.s.p5.fill(this.s.theme.greenBg());

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