import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class NoiseAcceleration extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const mover = new Mover(this.sketch(s));

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.background(this.theme.bg());

            mover.update();
            mover.checkEdges();
            mover.render();
        }
    }
}

class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    offset: p5.Vector;
    topSpeed: number = 10;

    constructor(
        public s: Sketch,
        public size: number = 48
    ) {
        this.position = s.p5.createVector(s.width / 2, s.height / 2);
        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(-0.001, 0.01);

        this.offset = s.p5.createVector(
            s.p5.floor(s.p5.random(0, 100000)),
            s.p5.floor(s.p5.random(0, 100000))
        );
    }

    calculate(offset: number) {
        return this.s.p5.map(
            this.s.p5.noise(offset),
            0, 1,
            -0.01, 0.01
        );
    }

    update() {
        this.acceleration.add(
            this.calculate(this.offset.x),
            this.calculate(this.offset.y)            
        );

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);

        this.offset.add(0.01, 0.01);
    }

    render() {
        this.s.p5.noStroke();

        const hue = this.s.p5.map(
            Math.max(
                Math.abs(this.velocity.x),
                Math.abs(this.velocity.y)
            ),
            0, this.topSpeed,
            0, 140
        );

        this.s.p5.fill(hue, 100, 50, .8);

        this.s.p5.circle(
            this.position.x,
            this.position.y,
            this.size
        );
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