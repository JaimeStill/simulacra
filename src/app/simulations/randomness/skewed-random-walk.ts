import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class SkewedRandomWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const walker = new Walker(
            this.width,
            this.height,
            this.theme
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());
        };

        s.draw = () => {
            walker.step(s);
            walker.show(s);
        }
    }
}

class Walker {
    public x: number;
    public y: number;

    constructor(
        public width: number,
        public height: number,
        protected t: Theme,
        protected stroke: number = 4
    ) {
        this.x = this.stroke;
        this.y = height / 2;
    }

    show(s: p5) {
        s.stroke(this.t.color());
        s.strokeWeight(this.stroke);
        s.point(this.x, this.y);
    }

    step(s: p5) {
        const r = s.random(1);

        if (r < 0.4)
            this.x += this.stroke;
        else if (r < 0.6)
            this.x -= this.stroke;
        else if (r < 0.8)
            this.y += this.stroke;
        else
            this.y -= this.stroke;

        this.x = s.constrain(this.x, this.stroke, this.width - this.stroke);
        this.y = s.constrain(this.y, this.stroke, this.height - this.stroke);
    }
}