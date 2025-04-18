import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class ProbabilityRandomWalk extends Simulation {
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
    x: number;
    y: number;

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
        let xStep = this.calculate(s);
        let yStep = this.calculate(s);
        
        this.x += xStep;
        this.y += yStep;

        this.x = s.constrain(this.x, this.stroke, this.width - this.stroke);
        this.y = s.constrain(this.y, this.stroke, this.height - this.stroke);
    }

    calculate(s: p5) {
        let step = this.acceptReject(s) * this.stroke * 2;

        if (s.random([false, true]))
            step *= -1;

        return step;
    }

    acceptReject(s: p5) {
        while (true) {
            const r1 = s.random(1);
            const probability = r1 * r1;
            const r2 = s.random(1);

            if (r2 < probability)
                return r1;
        }
    }
}