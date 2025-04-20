import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Background } from './background';

export class VectorsEcosystem extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const background: Background = new Background(
            s,
            this.theme,
            this.width,
            this.height
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            background.render();
        }
    }
}