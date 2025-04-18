import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class NoiseStepWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const walker = new Walker(
            s,
            this.width,
            this.height,
            this.theme
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());
        };

        s.draw = () => {
            walker.step();
            walker.show();
        };
    }
}

class Walker {
    x: number;
    y: number;

    // boundary
    bx: number;
    by: number;

    // noise offset
    tx: number = 0;
    ty: number = 10000;

    constructor(
        public s: p5,
        public width: number,
        public height: number,
        protected t: Theme,
        protected stroke: number = 12
    ) {
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.bx = this.width - stroke;
        this.by = this.height - stroke;
    }

    show() {
        this.s.stroke(this.t.green1(.3));
        this.s.strokeWeight(this.stroke);
        this.s.point(this.x, this.y);
    }

    step() {        
        this.x += this.calculate(this.tx);
        this.y += this.calculate(this.ty);

        this.x = this.s.constrain(
            this.x,
            this.stroke,
            this.bx
        );

        this.y = this.s.constrain(
            this.y,
            this.stroke,
            this.by
        );

        this.tx += 0.01;
        this.ty += 0.01;
    }

    calculate(t: number) {
        return this.s.map(
            this.s.noise(t),
            0, 1,
            this.stroke * -1, this.stroke
        );
    }
}