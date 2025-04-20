import p5 from 'p5';
import { ICreature, ISpawner } from './interfaces';
import { Theme } from '../../../models';
import { Neurozoid } from './neurozoid';

export class Protospore implements ICreature, ISpawner {
    hatched: boolean = false;
    age: number = 0;
    ageRate: number = 0.4;

    hue: number;
    lifespan: number;

    origin: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    constructor(
        public s: p5,
        public t: Theme,
        public position: p5.Vector,
        public width: number,
        public height: number
    ) {
        this.hue = s.map(
            s.random(),
            0, 1,
            0, 360
        );

        this.lifespan = s.floor(s.random(48, 64));
        this.origin = position.copy();
        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
    }

    radius(): number {
        return this.age / 2;
    }

    render(): void {
        this.s.push();

        this.s.strokeWeight(this.age > 2 ? 2 : this.age);
        this.s.stroke(this.hue, 100, 60, 1);
        this.s.fill(this.hue, 100, 60, .4);

        this.s.circle(this.position.x, this.position.y, this.age);

        this.s.pop();
    }

    update(): void{
        this.age += this.ageRate;

        if (this.age >= this.lifespan) {
            this.hatched = true;
            this.age = 0;
        }

        // update motion
    }

    spawn(): Neurozoid {
        return new Neurozoid(
            this.s,
            this.t,
            this.position.copy(),
            this.width,
            this.height
        );
    }
}