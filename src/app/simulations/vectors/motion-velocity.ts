import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class MotionVelocity extends Simulation {
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
        public s: p5,
        public t: Theme,
        public width: number,
        public height: number,
        public size: number = 48
    ) {
        this.position = s.createVector(
            s.random(width),
            s.random(height)
        );

        this.velocity = s.createVector(
            s.random(-2, 2),
            s.random(-2, 2)
        );
    }

    update() {
        this.position.add(this.velocity);
    }

    render() {
        this.s.stroke(this.t.purple2());
        this.s.fill(this.t.purpleBg());

        this.s.circle(this.position.x, this.position.y, this.size);
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