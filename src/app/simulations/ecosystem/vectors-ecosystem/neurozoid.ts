import p5 from 'p5';
import { ICreature } from './interfaces';
import { Theme } from '../../../models';
import { Limb } from './limb';

export class Neurozoid implements ICreature {
    dead: boolean = false;
    age: number = 0;
    ageRate: number = 0.4;
    limbs: Limb[] = [];

    hue: number;
    size: number;
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
        this.hue = s.floor(s.random(0, 361));
        this.size = s.floor(s.random(48, 73));
        this.lifespan = s.floor(s.random(90, 121));
        this.topSpeed = s.floor(s.random(2, 7));

        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
        this.interval = s.createVector(0.01, 0.01);

        this.offset = s.createVector(
            s.floor(s.random(0, 100000)),
            s.floor(s.random(0, 100000))
        );

        this.generateLimbs();
    }

    render(): void {        
        this.s.push();

        this.limbs.forEach(l => l.render(this.hue, this.position));

        this.s.noStroke();
        this.s.fill(this.hue, 100, 60, .8);
        this.s.circle(this.position.x, this.position.y, this.size / 2);

        this.s.pop();
    }

    update(): void {
        this.age += this.ageRate;
        this.hue++;

        if (this.hue > 360)
            this.hue = 0;

        if (this.age >= this.lifespan)
            this.dead = true;

        this.move();
        this.checkEdges();
    }

    private checkEdges() {
        if (this.position.x > this.width)
            this.position.x = 0;
        else if (this.position.x < 0)
            this.position.x = this.width;

        if (this.position.y > this.height)
            this.position.y = 0;
        else if (this.position.y < 0)
            this.position.y = this.height;
    }

    private generateLimbs() {
        const count = this.s.floor(this.s.random(3, 13));
        for (let i = 0; i < count; i++) {
            let a = this.s.map(i, 0, count, 0, this.s.TWO_PI);
            let v = p5.Vector.fromAngle(a);
            v.mult((this.size / 2) * 1.25);
            this.limbs[i] = new Limb(this.s, v);
        }
    }

    private move() {
        this.acceleration.add(
            this.setSpeed(this.offset.x),
            this.setSpeed(this.offset.y)
        );

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
        this.offset.add(this.interval);
    }

    private setSpeed(offset: number) {
        return this.s.map(
            this.s.noise(offset),
            0, 1,
            -0.01, 0.01
        )
    }
}