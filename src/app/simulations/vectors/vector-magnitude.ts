import p5 from 'p5';
import { Simulation } from '../simulation';

export class VectorMagnitude extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const viewMag = s.mag(this.width, this.height) / 2;

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.background(this.theme.bg());

            let mouse = s.createVector(
                s.mouseX,
                s.mouseY
            );

            let center = s.createVector(
                this.width / 2,
                this.height / 2
            );

            mouse.sub(center);

            let m = s.map(mouse.mag(), 0, viewMag, 0, this.width);
            const hue = s.map(m, 0, this.width, 0, 360);
            s.noStroke();
            s.fill(hue, 100, 50, .8);
            s.rect(0, 0, m, 8);

            s.translate(this.width / 2, this.height / 2);
            s.strokeWeight(4);
            s.stroke(this.theme.green1());
            s.line(0, 0, mouse.x, mouse.y);
        }
    }
}