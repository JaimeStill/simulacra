import p5 from 'p5';
import { Simulation } from '../simulation';

export class BouncingBallNoVectors extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const size: number = 32;

        let x: number = 100;
        let y: number = 100;
        let sx: number = 3.3;
        let sy: number = 3;

        s.setup = () => {
            s.createCanvas(this.width, this.height);
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg());
            s.stroke(this.theme.green1());
            s.fill(this.theme.greenBg());

            x += sx;
            y += sy;

            if (x > this.width - size || x < size)
                sx *= -1;

            if (y > this.height - size || y < size)
                sy *= -1;

            s.circle(x, y, size * 2);
        }
    }
}