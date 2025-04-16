import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class TraditionalRandomWalk extends Simulation {
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
        };
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
        this.x = width / 2;
        this.y = height / 2;
    }

    show(s: p5) {
        s.stroke(this.t.green1(.5));
        s.strokeWeight(this.stroke);
        s.point(this.x, this.y);
    }

    step(s: p5) {
        const choice = s.floor(s.random(4));

        switch (choice) {
            case 0:
                this.x += this.stroke;
                break;
            case 1:
                this.x -= this.stroke;
                break;
            case 2:
                this.y += this.stroke;
                break;
            default:
                this.y -= this.stroke;
                break;
        }

        this.x = s.constrain(this.x, this.stroke, this.width - this.stroke);
        this.y = s.constrain(this.y, this.stroke, this.height - this.stroke);
    }
}