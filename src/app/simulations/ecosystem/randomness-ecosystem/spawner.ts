import { Creature } from './creature';
import { Sketch } from '../../../models';

export class Spawner {
    x: number;
    y: number;
    max: number = 30;
    margin: number = 30;

    creatures: Creature[] = [];

    constructor(
        public s: Sketch
    ) {
        this.x = s.width / 2;
        this.y = s.height / 2;
    }

    spawn() {
        const gen = this.max - this.creatures.length;

        for (let i = 0; i < gen; i++)
            this.creatures.push(new Creature(
                this.s,
                this.random(this.x),
                this.random(this.y)
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
        return this.s.p5.floor(
            this.s.p5.randomGaussian(basis, 180)
        );
    }
}