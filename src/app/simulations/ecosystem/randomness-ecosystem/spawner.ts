import p5 from 'p5';
import { Creature } from './creature';
import { Theme } from '../../../models';

export class Spawner {
    x: number;
    y: number;
    max: number = 30;
    margin: number = 30;

    creatures: Creature[] = [];

    constructor(
        public s: p5,
        public t: Theme,
        public width: number,
        public height: number
    ) {
        this.x = this.width / 2;
        this.y = this.height / 2;
    }

    spawn() {
        const gen = this.max - this.creatures.length;

        for (let i = 0; i < gen; i++)
            this.creatures.push(new Creature(
                this.s,
                this.random(this.x),
                this.random(this.y),
                this.width,
                this.height
            ));
    }

    animate() {
        this.creatures = this.creatures
            .filter(c => c.age < c.lifespan);

        for (let creature of this.creatures) {
            creature.move();
            creature.draw();
        }
    }

    random(basis: number) {
        return this.s.floor(
            this.s.randomGaussian(basis, 180)
        );
    }
}