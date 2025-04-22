import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class NoiseStepWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const walker = new Walker(this.sketch(s));

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
        public s: Sketch,
        protected stroke: number = 12
    ) {
        this.x = s.width / 2;
        this.y = s.height / 2;
        this.bx = s.width - stroke;
        this.by = s.height - stroke;
    }

    show() {
        this.s.p5.stroke(this.s.theme.green1(.3));
        this.s.p5.strokeWeight(this.stroke);
        this.s.p5.point(this.x, this.y);
    }

    step() {        
        this.x += this.calculate(this.tx);
        this.y += this.calculate(this.ty);

        this.x = this.s.p5.constrain(
            this.x,
            this.stroke,
            this.bx
        );

        this.y = this.s.p5.constrain(
            this.y,
            this.stroke,
            this.by
        );

        this.tx += 0.01;
        this.ty += 0.01;
    }

    calculate(t: number) {
        return this.s.p5.map(
            this.s.p5.noise(t),
            0, 1,
            this.stroke * -1, this.stroke
        );
    }
}