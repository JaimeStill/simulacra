import p5 from 'p5';
import { Simulation } from '../simulation';

export class VectorSubtraction extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);            
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

            s.stroke(this.theme.greenBg());
            s.strokeWeight(4);
            s.line(0, 0, mouse.x, mouse.y);
            s.line(0, 0, center.x, center.y);

            mouse.sub(center);

            s.stroke(this.theme.green1());

            s.translate(
                this.width / 2,
                this.height / 2
            );

            s.line(0, 0, mouse.x, mouse.y);
        }
    }
}