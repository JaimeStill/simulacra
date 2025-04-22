import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class GravitationalAttraction extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const bodyA = new Mover(
            this.sketch(s),
            s.createVector(60, 60)
        );

        const bodyB = new Mover(
            this.sketch(s),
            s.createVector(this.width - 60, this.height - 60)
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
        }

        s.draw = () => {
            s.background(this.theme.bg());

            bodyA.update(bodyB);
            bodyB.update(bodyA);

            bodyA.checkEdges();
            bodyB.checkEdges();

            bodyA.render();
            bodyB.render();
        }
    }
}

class Mover {
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number = 60;
    viewMag: number;

    constructor(
        public s: Sketch,
        public position: p5.Vector,
        public size: number = 48
    ) {
        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);
        this.viewMag = s.p5.mag(this.s.width, this.s.height) / 2;
    }

    update(body: Mover) {
        const bearing = p5.Vector.sub(body.position, this.position);
        const mag = bearing.mag();

        bearing.normalize();

        bearing.mult(this.s.p5.map(
            mag,
            0, this.viewMag,
            0.01, 2
        ));

        this.acceleration = bearing;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.position.add(this.velocity);
    }

    render() {
        this.s.p5.noStroke();

        const hue = this.s.p5.map(
            Math.max(
                Math.abs(this.velocity.x),
                Math.abs(this.velocity.y)
            ),
            0, this.topSpeed,
            0, 140
        );

        this.s.p5.fill(hue, 100, 50, .8);

        this.s.p5.circle(
            this.position.x,
            this.position.y,
            this.size
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