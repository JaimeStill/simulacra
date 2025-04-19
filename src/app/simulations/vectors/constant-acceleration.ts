import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class ConstantAcceleration extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const mover = new Mover(
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
    topSpeed: number = 10;

    constructor(
        public s: p5,
        public t: Theme,
        public width: number,
        public height: number,
        public size: number = 48
    ) {
        this.position = s.createVector(width / 2, height / 2);
        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(-0.001, 0.01);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
    }

    render() {
        this.s.noStroke();

        const hue = this.s.map(
            Math.max(
                Math.abs(this.velocity.x),
                Math.abs(this.velocity.y)
            ),
            0, this.topSpeed,
            0, 140
        );

        this.s.fill(hue, 100, 50, .8);

        this.s.circle(
            this.position.x,
            this.position.y,
            this.size
        );
    }

    checkEdges() {
        if (this.position.x > this.width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.width;

        if (this.position.y > this.height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.height;
    }
}