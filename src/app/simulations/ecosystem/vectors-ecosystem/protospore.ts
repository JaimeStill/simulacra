import p5 from 'p5';
import { ICreature, ISpawner } from './interfaces';
import { Sketch } from '../../../models';
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
        public s: Sketch,
        public position: p5.Vector
    ) {
        this.hue = s.p5.map(
            s.p5.random(),
            0, 1,
            0, 360
        );

        this.lifespan = s.p5.floor(s.p5.random(64, 72));
        this.topSpeed = s.p5.random(0.1, 1);

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
        this.interval = s.p5.createVector(0.01, 0.01);

        this.offset = s.p5.createVector(
            s.p5.floor(s.p5.random(0, 100000)),
            s.p5.floor(s.p5.random(0, 100000))
        );

        const check = s.p5.floor(s.p5.random(0, 2));

        this.lightness = check === 0
            ? 96
            : 16;
    }

    render(): void {
        this.s.p5.push();

        this.s.p5.noStroke();
        this.s.p5.fill(this.hue, 100, 60, .8);
        this.s.p5.circle(this.position.x, this.position.y, this.age / 1.5);
        this.s.p5.fill(this.hue, 100, this.lightness, .2);
        this.s.p5.circle(this.position.x, this.position.y, this.age);

        this.s.p5.pop();
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
        return this.s.p5.map(
            this.s.p5.noise(offset),
            0, 1,
            min, max
        )
    }

    spawn(): Neurozoid {
        return new Neurozoid(
            this.s,
            this.position.copy()
        );
    }

    checkEdges() {
        if (this.position.x > this.s.width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.s.width;

        if (this.position.y > this.s.height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.s.height;
    }
}