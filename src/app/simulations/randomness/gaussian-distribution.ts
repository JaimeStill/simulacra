import p5 from 'p5';
import { Simulation } from '../simulation';

export class GaussianDistribution extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());
        }

        s.draw = () => {
            let x = s.randomGaussian(
                this.width / 2,
                this.width > 200
                    ? 90
                    : 30
            );

            s.noStroke();
            s.fill(this.theme.green1(.1));
            s.circle(x, s.height / 2, 16);
        }
    }
}