import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class ForcesOnTwoObjects extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const gravity: p5.Vector = s.createVector(0, 0.1);
        const wind: p5.Vector = s.createVector(0.1, 0);
        const balls: Ball[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);

            balls[0] = new Ball(s, this.theme, 10, this.width, this.height);
            balls[1] = new Ball(s, this.theme, 2, this.width, this.height);
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg());

            balls.forEach(b => {
                b.applyForce(gravity);

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

    constructor(
        public s: p5,
        public t: Theme,
        public mass: number,
        public cw: number,
        public ch: number
    ) {
        this.position = s.createVector(
            s.randomGaussian(cw / 2, 120),
            ch / 4
        );

        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
    }

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

        this.s.stroke(this.t.green2());
        this.s.strokeWeight(2);
        this.s.fill(this.t.greenBg());

        this.s.circle(
            this.position.x,
            this.position.y,
            this.size()
        );

        this.s.pop();
    }

    checkEdges() {
        if (this.position.x > this.cw - this.radius()) {
            this.position.x = this.cw - this.radius();
            this.velocity.x *= -1;
        } else if (this.position.x < this.radius()) {
            this.position.x = this.radius();
            this.velocity.x *= -1;
        }
        
        if (this.position.y > this.ch - this.radius()) {
            this.position.y = this.ch - this.radius();
            this.velocity.y *= -1;
        } else if (this.position.y < this.radius()) {
            this.position.y = this.radius();
            this.velocity.y *= -1;
        }
    }
}