import p5 from 'p5';
import { Simulation } from '../simulations';
import { Theme } from '../theme';

export class TraditionalRandomWalk extends Simulation {
    constructor(element: HTMLElement) {
        super(
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

    bound(val: number, factor: number, limit: number, inc: boolean) {
        const target = inc
            ? val + factor
            : val - factor;

        if (inc)
            return target > limit
                ? limit
                : target;
        else
            return target < limit
                ? limit
                : target;
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
                this.x = this.bound(this.x, this.stroke, this.width - this.stroke, true);
                break;
            case 1:
                this.x = this.bound(this.x, this.stroke, this.stroke, false);
                break;
            case 2:
                this.y = this.bound(this.y, this.stroke, this.height - this.stroke, true);
                break;
            default:
                this.y = this.bound(this.y, this.stroke, this.stroke, false);
                break;
        }
    }
}