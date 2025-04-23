import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class GravityScaledMass extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const wind: p5.Vector = s.createVector(0.1, 0);
        const balls: Ball[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);

            balls[0] = new Ball(this.sketch(s), 10);
            balls[1] = new Ball(this.sketch(s), 2);
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg());

            balls.forEach(b => {
                if (s.mouseIsPressed)
                    b.applyForce(wind);

                b.update();
                b.render();
                b.checkEdges();
            });
        }
    }
}

class Ball {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    gravity: p5.Vector;

    constructor(
        public s: Sketch,
        public mass: number
    ) {
        this.position = s.p5.createVector(
            s.p5.randomGaussian(s.width / 2, 120),
            s.height / 4
        );

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
        this.gravity = s.p5.createVector(0, 0.1).mult(mass);
    }

    size = (): number => this.mass * 16;
    radius = (): number => this.size() / 2;

    applyForce(force: p5.Vector) {
        const f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.applyForce(this.gravity);
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
            this.size()
        );

        this.s.p5.pop();
    }

    checkEdges() {
        if (this.position.x > this.s.width - this.radius()) {
            this.position.x = this.s.width - this.radius();
            this.velocity.x *= -1;
        } else if (this.position.x < this.radius()) {
            this.position.x = this.radius();
            this.velocity.x *= -1;
        }
        
        if (this.position.y > this.s.height - this.radius()) {
            this.position.y = this.s.height - this.radius();
            this.velocity.y *= -1;
        } else if (this.position.y < this.radius()) {
            this.position.y = this.radius();
            this.velocity.y *= -1;
        }
    }
}