import p5 from 'p5';
import { ICreature, ISpawner } from './interfaces';
import { Theme } from '../../../models';
import { Neurozoid } from './neurozoid';

export class Protospore implements ICreature, ISpawner {
    hatched: boolean = false;
    age: number = 0;
    ageRate: number = 0.4;

    hue: number;
    lightness: number;
    lifespan: number;
    topSpeed: number;

    velocity: p5.Vector;
    acceleration: p5.Vector;
    interval: p5.Vector;
    offset: p5.Vector;

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

        this.lifespan = s.floor(s.random(64, 72));
        this.topSpeed = s.random(0.1, 1);

        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
        this.interval = s.createVector(0.01, 0.01);

        this.offset = s.createVector(
            s.floor(s.random(0, 100000)),
            s.floor(s.random(0, 100000))
        );

        const check = s.floor(s.random(0, 2));

        this.lightness = check === 0
            ? 96
            : 16;
    }

    render(): void {
        this.s.push();

        this.s.noStroke();
        this.s.fill(this.hue, 100, 60, .8);
        this.s.circle(this.position.x, this.position.y, this.age / 1.5);
        this.s.fill(this.hue, 100, this.lightness, .2);
        this.s.circle(this.position.x, this.position.y, this.age);

        this.s.pop();
    }

    update(): void{
        this.age += this.ageRate;

        if (this.age >= this.lifespan) {
            this.hatched = true;
            this.age = 0;
        }
        
        this.move();
        this.checkEdges();
    }

    move() {
        this.acceleration.add(
            this.setSpeed(
                this.offset.x,
                -0.01, 0.02
            ),
            this.setSpeed(
                this.offset.y,
                -0.09, 0.1
            )
        );

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
        this.offset.add(this.interval);
    }

    setSpeed(offset: number, min: number, max: number) {
        return this.s.map(
            this.s.noise(offset),
            0, 1,
            min, max
        )
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

    checkEdges() {
        if (this.position.x > this.width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.width;

        if (this.position.y > this.height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.height;
    }
}