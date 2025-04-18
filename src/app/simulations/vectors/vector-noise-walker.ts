import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class VectorNoiseWalker extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const walker = new Walker(
            s,
            this.theme,
            this.width,
            this.height
        );

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
        public s: p5,
        public t: Theme,
        public width: number,
        public height: number,
        public stroke: number = 12
    ) {
        this.pos = s.createVector(0, 0);
        this.offset = s.createVector(0, 10000);
        this.increment = s.createVector(0.01, 0.01);

        this.bounds = s.createVector(
            this.width - stroke,
            this.height - stroke
        );
    }

    show() {
        this.s.stroke(this.t.green1(.5));
        this.s.strokeWeight(this.stroke);
        this.s.point(this.pos.x, this.pos.y);
    }

    step() {
        this.pos.x = this.s.constrain(
            this.calculate(
                this.offset.x,
                this.width
            ),
            this.stroke,
            this.bounds.x
        );

        this.pos.y = this.s.constrain(
            this.calculate(
                this.offset.y,
                this.height
            ),
            this.stroke,
            this.bounds.y
        );

        this.offset.add(this.increment);
    }

    calculate(t: number, max: number) {
        return this.s.map(
            this.s.noise(t),
            0, 1,
            0, max
        );
    }
}