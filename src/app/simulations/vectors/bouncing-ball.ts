import p5 from 'p5';
import { Simulation } from '../simulation';

export class BouncingBall extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const size: number = 32;

        let position = s.createVector(100, 100);
        let velocity = s.createVector(3.6, 3);

        s.setup = () => {
            s.createCanvas(this.width, this.height);            
        }

        s.draw = () => {
            s.background(this.theme.bg());
            s.stroke(this.theme.green1());
            s.fill(this.theme.greenBg());
            
            position.add(velocity);

            if (position.x > this.width - size || position.x < size)
                velocity.x *= -1;

            if (position.y > this.height - size || position.y < size)
                velocity.y *= -1;

            s.circle(position.x, position.y, size* 2);
        }
    }
}