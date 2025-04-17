import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class NoiseRandomWalk extends Simulation {
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
    public bx: number;
    public by: number;
    public x: number = 0;
    public y: number = 0;
    public tx: number = 0;
    public ty: number = 10000;

    constructor(
        public s: p5,
        public width: number,
        public height: number,
        protected t: Theme,
        protected stroke: number = 12
    ) {
        this.bx = this.width - stroke;
        this.by = this.height - stroke;
        this.step();
        
        this.tx += 0.01;
        this.ty += 0.01;
    }

    show() {
        this.s.stroke(this.t.green1(.5));
        this.s.strokeWeight(this.stroke);
        this.s.point(this.x, this.y);
    }

    step() {        
        this.x = this.calculate(
            this.tx,
            this.width
        );

        this.y = this.calculate(
            this.ty,
            this.height
        );

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

    calculate(t: number, max: number) {
        return this.s.map(
            this.s.noise(t), 0, 1, 0, max
        );
    }
}