import p5 from 'p5';
import { Simulation } from '../simulation';

export class VectorMultiplication extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);            
        }

        s.draw = () => {
            let double: p5.Vector = s.createVector();
            let half: p5.Vector = s.createVector();

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
            mouse.mult(.5);

            p5.Vector.mult(mouse, .5, half);
            p5.Vector.mult(mouse, 2, double);

            s.translate(
                this.width / 2,
                this.height / 2
            );

            s.strokeWeight(4);
            s.stroke(this.theme.red2());
            s.line(0, 0, half.x, half.y);

            s.strokeWeight(2);
            s.stroke(this.theme.blue2());
            s.line(half.x, half.y, mouse.x, mouse.y);

            s.strokeWeight(1);
            s.stroke(this.theme.green2());
            s.line(mouse.x, mouse.y, double.x, double.y);
        }
    }
}