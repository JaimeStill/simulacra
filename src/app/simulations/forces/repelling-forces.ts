import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class RepellingForces extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const gravity: p5.Vector = s.createVector(0, 0.1);
        const repellents: Repellent[] = [];
        const balls: Ball[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initRepellents();
            initBalls();
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg());

            repellents.forEach(r => r.render());

            balls.forEach(b => {
                b.applyForce(gravity);

                repellents.forEach(r =>
                    b.applyForce(
                        r.repel(b.position)
                    )
                );

                b.update();
                b.render();
                b.checkEdges();
            });
        }

        const createRepellent = (orientation: Orientation) => new Repellent(
            s,
            this.theme,
            orientation,
            this.width,
            this.height
        );

        const createBall = (mass: number) => new Ball(
            s,
            this.theme,
            mass,
            this.width,
            this.height
        );

        const initRepellents = () => {
            repellents[0] = createRepellent('top');
            repellents[1] = createRepellent('right');
            repellents[2] = createRepellent('bottom');
            repellents[3] = createRepellent('left');
        }

        const initBalls = () => {
            for (let i = 0; i < 50; i++)
                balls[i] = createBall(
                    s.floor(s.random(1, 4))
                );
        }
    }
}

type Orientation = 'top' | 'right' | 'bottom' | 'left';

class Repellent {
    thickness: number = 8;
    falloff: number = 30;
    scale: number = 1;

    position: p5.Vector;

    constructor(
        public s: p5,
        public t: Theme,
        public orientation: Orientation,
        public cw: number,
        public ch: number,
    ) {
        this.position = this.calcPosition();
    }

    render() {
        this.s.push();

        this.s.noFill();
        this.s.stroke(this.t.red2());
        this.s.strokeWeight(this.thickness);

        switch (this.orientation) {
            case 'top':
                this.s.line(0, 0, this.cw, 0);
                break;
            case 'right':
                this.s.line(this.cw, 0, this.cw, this.ch);
                break;
            case 'bottom':
                this.s.line(0, this.ch, this.cw, this.ch);
                break;
            case 'left':
                this.s.line(0, 0, 0, this.ch);
                break;
        }

        this.s.pop();
    }

    repel(object: p5.Vector): p5.Vector {
        const pos = object.copy();
        const distance = this.calcDistance(pos);
        const magnitude = this.magnitude(distance);

        const force = this.isHorizontal()
            ? this.s.createVector(0, magnitude)
            : this.s.createVector(magnitude, 0);

        return force;
    }

    private isNegative = () =>
        this.orientation === 'right'
        || this.orientation === 'bottom';

    private isHorizontal = () =>
        this.orientation === 'top'
        || this.orientation === 'bottom';

    private calcPosition(): p5.Vector {
        switch (this.orientation) {
            case 'top':
                return this.s.createVector(this.cw / 2, 0);
            case 'right':
                return this.s.createVector(this.cw, this.ch / 2);
            case 'bottom':
                return this.s.createVector(this.cw / 2, this.ch);
            default:
                return this.s.createVector(0, this.ch / 2);
        }
    }

    private calcDistance(pos: p5.Vector): number {
        return this.isHorizontal()
            ? pos.sub(pos.x, this.position.y).mag()
            : pos.sub(this.position.x, pos.y).mag();
    }

    private magnitude(distance: number): number {
        if (distance > this.falloff)
            return 0;

        let mag = this.s.map(
            distance,
            0, this.falloff,
            this.falloff * this.scale, 0
        );

        return this.isNegative()
            ? mag * -1
            : mag;
    }
}

class Ball {
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
            s.randomGaussian(cw / 2, 180),
            ch / 2
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