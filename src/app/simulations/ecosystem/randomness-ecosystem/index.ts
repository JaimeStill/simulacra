import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Spawner } from './spawner';
import { Background } from './background';

export class RandomnessEcosystem extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const spawner: Spawner = new Spawner(
            s,
            this.theme,
            this.width,
            this.height
        );

        const background: Background = new Background(
            s,
            this.theme,
            this.width,
            this.height
        );

        s.colorMode(s.HSL);

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.stroke(this.theme.color());
        }

        s.draw = () => {
            s.clear();
            background.render();

            spawner.spawn();
            spawner.animate();
        }
    }
}