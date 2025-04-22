import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class MultiWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const walkers: Walker[] = [];

        for (let i = 0; i < s.floor(s.random(3, 10)); i++)
            walkers.push(new Walker(
                this.sketch(s),
                s.floor(s.random(0, 100000)),
                s.floor(s.random(0, 100000)),
                s.floor(s.random(0, 360))
            ));

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());
        };

        s.draw = () => {
            for (let i = 0; i < walkers.length; i++) {
                walkers[i].step();
                walkers[i].show();
            }
        };
    }
}

class Walker {
    bx: number;
    by: number;
    x: number = 0;
    y: number = 0;
    stroke: number;

    constructor(
        public s: Sketch,
        public tx: number,
        public ty: number,
        public hue: number
    ) {
        this.stroke = s.p5.floor(s.p5.random(3, 9));
        this.bx = this.s.width - this.stroke;
        this.by = this.s.height - this.stroke;
        this.step();
    }

    show() {
        this.s.p5.stroke(this.s.theme.hsla(
            this.hue,
            100,
            this.s.theme.isDark() ? 66 : 33,
            .5
        ));

        this.s.p5.strokeWeight(this.stroke);
        this.s.p5.point(this.x, this.y);
    }

    step() {        
        this.x = this.calculate(
            this.tx,
            this.s.width
        );

        this.y = this.calculate(
            this.ty,
            this.s.height
        );

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

    calculate(t: number, max: number) {
        return this.s.p5.map(
            this.s.p5.noise(t), 0, 1, 0, max
        );
    }
}