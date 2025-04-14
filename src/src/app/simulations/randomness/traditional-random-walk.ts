import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../theme';

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

    bound(val: number, factor: number, limit?: number) {
        let result: number;

        if (limit) {
            const target = val + factor;

            result = target > limit
                ? limit
                : target;
        } else {
            const target = val - factor;

            result = target < 0
                ? 0
                : target;
        }

        return result;
    }

    show(s: p5) {
        s.stroke(this.t.color());
        s.strokeWeight(this.stroke);
        s.point(this.x, this.y);
    }

    step(s: p5) {
        const choice = s.floor(s.random(4));

        switch (choice) {
            case 0:
                this.x = this.bound(this.x, this.stroke, this.width);
                break;
            case 1:
                this.x = this.bound(this.x, this.stroke);
                break;
            case 2:
                this.y = this.bound(this.y, this.stroke, this.height);
                break;
            default:
                this.y = this.bound(this.y, this.stroke);
                break;
        }
    }
}

export class TraditionalRandomWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(
            'Traditional Random Walker',
            'traditional-random-walker',
            0,
            element
        );
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