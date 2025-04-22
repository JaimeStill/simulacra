import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class MotionVelocity extends Simulation {
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

            mover.update()
            mover.checkEdges();
            mover.render();
        }
    }
}

class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    constructor(
        public s: Sketch,
        public size: number = 48
    ) {
        this.position = s.p5.createVector(
            s.p5.random(s.width),
            s.p5.random(s.height)
        );

        this.velocity = s.p5.createVector(
            s.p5.random(-2, 2),
            s.p5.random(-2, 2)
        );
    }

    update() {
        this.position.add(this.velocity);
    }

    render() {
        this.s.p5.stroke(this.s.theme.purple2());
        this.s.p5.fill(this.s.theme.purpleBg());

        this.s.p5.circle(this.position.x, this.position.y, this.size);
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