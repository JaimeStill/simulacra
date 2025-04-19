import p5 from 'p5';
import { Simulation } from '../simulation';

export class BouncingBall extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const size: number = 72;
        const radius: number = size / 2;
        const eyeSize = size * 0.15;
        const eyeOffset = size * 0.2;
        const smileSize = size * 0.8;
        const smileOffset = size * 0.01;

        let position = s.createVector(100, 100);
        let velocity = s.createVector(3.6, 3);

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.background(this.theme.bg());
            
            position.add(velocity);

            if (position.x > this.width - radius || position.x < radius)
                velocity.x *= -1;

            if (position.y > this.height - radius || position.y < radius)
                velocity.y *= -1;

            drawSmileyFace();
        }

        const drawSmileyFace = () => {
            s.noStroke();

            const outline = this.theme.isDark()
                ? this.theme.bg()
                : this.theme.color();

            const hue = s.map(position.x, radius, this.width - radius, 0, 360);

            s.fill(hue, 100, 50, 0.8);

            s.circle(position.x, position.y, size);

            s.fill(outline);
            s.circle(position.x - eyeOffset, position.y - eyeOffset, eyeSize);
            s.circle(position.x + eyeOffset, position.y - eyeOffset, eyeSize);

            s.noFill();
            s.strokeWeight(2);
            s.stroke(outline);
            s.arc(
                position.x,
                position.y + smileOffset,
                smileSize,
                smileSize,
                s.PI * 0.2,
                s.PI * 0.8,
                s.OPEN
            );
        }
    }
}