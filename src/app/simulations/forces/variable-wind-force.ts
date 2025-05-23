import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class VariableWindForce extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const gravity: p5.Vector = s.createVector(0, 0.1);
        const ball: Ball = new Ball(this.sketch(s));
        let gusts: Gust[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg()); 
            
            ball.applyForce(gravity);
            
            if (s.mouseIsPressed) {
                const mouse = s.createVector(s.mouseX, s.mouseY);

                const force = ball.position
                    .copy()
                    .sub(mouse)
                    .normalize();

                gusts.push(new Gust(
                    this.sketch(s),
                    mouse,
                    force
                ));

                ball.applyForce(force);
            }

            ball.update();
            ball.render();
            ball.checkEdges();

            gusts.forEach(g => {
                g.update();
                g.render();
            });

            gusts = gusts.filter(g => !g.dissipated);
        }
    }
}

class Gust {
    size: number = 0;
    expandRate: number = 3;
    speed: number = 20;
    dissipated: boolean = false;

    constructor(
        public s: Sketch,
        public position: p5.Vector,
        public velocity: p5.Vector
    ) {}

    update() {
        this.size += this.expandRate;
        this.position.add(this.velocity.copy().mult(this.speed));

        if ((this.position.x < 0 || this.position.x > this.s.width)
            && (this.position.y < 0 || this.position.y > this.s.height))
            this.dissipated = true;
    }

    render() {
        this.s.p5.push();
        
        this.s.p5.noStroke();
        this.s.p5.fill(240, 100, 80, .8);   
        this.s.p5.circle(this.position.x, this.position.y, this.size / 2);

        this.s.p5.pop();
    }
}

class Ball {
    mass: number = 1;
    size: number = 48;

    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(public s: Sketch) {
        this.position = s.p5.createVector(
            s.width / 2,
            s.height / 4
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
            this.size
        );

        this.s.p5.pop();
    }

    checkEdges() {
        if (this.position.x > this.s.width - this.size / 2) {
            this.position.x = this.s.width - this.size / 2;
            this.velocity.x *= -1;
        } else if (this.position.x < this.size / 2) {
            this.position.x = this.size / 2;
            this.velocity.x *= -1;
        }
        
        if (this.position.y > this.s.height - this.size / 2) {
            this.position.y = this.s.height - this.size / 2;
            this.velocity.y *= -1;
        } else if (this.position.y < this.size / 2) {
            this.position.y = this.size / 2;
            this.velocity.y *= -1;
        }
    }
}