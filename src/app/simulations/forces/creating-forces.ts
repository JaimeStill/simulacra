import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class CreatingForces extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const gravity: p5.Vector = s.createVector(0, 0.1);
        const wind: p5.Vector = s.createVector(0.1, 0);

        const ball: Ball = new Ball(
            s,
            this.theme,
            this.width,
            this.height
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg()); 
            
            ball.applyForce(gravity);
            
            if (s.mouseIsPressed)
                ball.applyForce(wind);

            ball.update();
            ball.render();
            ball.checkEdges();
        }
    }
}

class Ball {
    mass: number = 1;
    size: number = 48;

    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(
        public s: p5,
        public t: Theme,
        public cw: number,
        public ch: number
    ) {
        this.position = s.createVector(
            cw / 2,
            ch / 4
        );

        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
    }

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
            this.size
        );

        this.s.pop();
    }

    checkEdges() {
        if (this.position.x > this.cw - this.size / 2) {
            this.position.x = this.cw - this.size / 2;
            this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
            this.position.x = this.size / 2;
            this.velocity.x *= -1;
        }
        
        if (this.position.y > this.ch - this.size / 2) {
            this.position.y = this.ch - this.size / 2;
            this.velocity.y *= -1;
        } else if (this.position.y < this.size / 2) {
            this.position.y = this.size / 2;
            this.velocity.y *= -1;
        }
    }
}