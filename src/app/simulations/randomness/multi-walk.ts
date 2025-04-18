import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class MultiWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const walkers: Walker[] = [];

        for (let i = 0; i < s.floor(s.random(3, 10)); i++)
            walkers.push(new Walker(
                s,
                this.width,
                this.height,
                s.floor(s.random(0, 100000)),
                s.floor(s.random(0, 100000)),
                s.floor(s.random(0, 361)),
                this.theme
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
        public s: p5,
        public width: number,
        public height: number,
        public tx: number,
        public ty: number,
        public hue: number,
        private t: Theme
    ) {
        this.stroke = s.floor(s.random(3, 9));
        this.bx = this.width - this.stroke;
        this.by = this.height - this.stroke;
        this.step();
    }

    show() {
        this.s.stroke(this.t.hsla(
            this.hue,
            100,
            this.t.isDark() ? 66 : 33,
            .5
        ));

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