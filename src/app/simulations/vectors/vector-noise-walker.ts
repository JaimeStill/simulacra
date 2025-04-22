import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class VectorNoiseWalker extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const walker = new Walker(this.sketch(s));

        s.setup = () => {
            s.createCanvas(this.width, this.height);
        }

        s.draw = () => {
            s.background(this.theme.bg());
            walker.step();
            walker.show();
        }
    }
}

class Walker {
    pos: p5.Vector;
    bounds: p5.Vector;
    offset: p5.Vector;
    increment: p5.Vector;

    constructor(
        public s: Sketch,
        public stroke: number = 12
    ) {
        this.pos = s.p5.createVector(0, 0);
        this.offset = s.p5.createVector(0, 10000);
        this.increment = s.p5.createVector(0.01, 0.01);

        this.bounds = s.p5.createVector(
            this.s.width - stroke,
            this.s.height - stroke
        );
    }

    show() {
        this.s.p5.stroke(this.s.theme.green1(.5));
        this.s.p5.strokeWeight(this.stroke);
        this.s.p5.point(this.pos.x, this.pos.y);
    }

    step() {
        this.pos.x = this.s.p5.constrain(
            this.calculate(
                this.offset.x,
                this.s.width
            ),
            this.stroke,
            this.bounds.x
        );

        this.pos.y = this.s.p5.constrain(
            this.calculate(
                this.offset.y,
                this.s.height
            ),
            this.stroke,
            this.bounds.y
        );

        this.offset.add(this.increment);
    }

    calculate(t: number, max: number) {
        return this.s.p5.map(
            this.s.p5.noise(t),
            0, 1,
            0, max
        );
    }
}