import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Creature } from './creature';

export class RandomnessEcosystem extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const margin: number = 30;

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            s.frameRate(1);
            s.stroke(this.theme.color());
        }

        s.draw = () => {
            s.clear();

            const creature: Creature = new Creature(
                s,
                s.floor(s.random(margin, this.width - margin)),
                s.floor(s.random(margin, this.height - margin))
            );

            creature.draw();
        }
    }
}