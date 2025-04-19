import p5 from 'p5';
import { Simulation } from '../simulation';

export class VectorNormalization extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);            
        }

        s.draw = () => {
            s.background(this.theme.bg());

            const mouse = s.createVector(
                s.mouseX,
                s.mouseY
            );

            const center = s.createVector(
                this.width / 2,
                this.height / 2
            );

            mouse.sub(center);
            
            s.translate(
                this.width / 2,
                this.height / 2
            );

            const normal = p5.Vector.normalize(mouse);
            normal.mult(60);

            s.stroke(this.theme.blue2());
            s.strokeWeight(4);
            s.line(0, 0, normal.x, normal.y);

            s.stroke(this.theme.green1());
            s.strokeWeight(1);
            s.line(normal.x, normal.y, mouse.x, mouse.y);
        }
    }
}