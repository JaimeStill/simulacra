import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class GaussianRandomWalk extends Simulation {
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
            walker.step(s);
            walker.show(s);
        };
    }
}

class Walker {
    x: number;
    y: number;

    constructor(
        public s: Sketch,
        protected stroke: number = 4
    ) {
        this.x = s.width / 2;
        this.y = s.height / 2;
    }

    show(s: p5) {
        s.stroke(this.s.theme.green1(.5));
        s.strokeWeight(this.stroke);
        s.point(this.x, this.y);
    }

    step(s: p5) {        
        this.x += this.calculate(s);
        this.y += this.calculate(s);

        this.x = s.constrain(this.x, this.stroke, this.s.width - this.stroke);
        this.y = s.constrain(this.y, this.stroke, this.s.height - this.stroke);
    }

    calculate(s: p5) {
        return s.randomGaussian(0, this.stroke * 2);
    }
}