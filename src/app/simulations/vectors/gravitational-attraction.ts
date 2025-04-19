import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class GravitationalAttraction extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const bodyA = new Mover(
            s,
            this.theme,
            s.createVector(60, 60),
            this.width,
            this.height
        );

        const bodyB = new Mover(
            s,
            this.theme,
            s.createVector(this.width - 60, this.height - 60),
            this.width,
            this.height
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
        public s: p5,
        public t: Theme,
        public position: p5.Vector,
        public width: number,
        public height: number,
        public size: number = 48
    ) {
        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);
        this.viewMag = s.mag(this.width, this.height) / 2;
    }

    update(body: Mover) {
        const bearing = p5.Vector.sub(body.position, this.position);
        const mag = bearing.mag();

        bearing.normalize();

        bearing.mult(this.s.map(
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
        this.s.noStroke();

        const hue = this.s.map(
            Math.max(
                Math.abs(this.velocity.x),
                Math.abs(this.velocity.y)
            ),
            0, this.topSpeed,
            0, 140
        );

        this.s.fill(hue, 100, 50, .8);

        this.s.circle(
            this.position.x,
            this.position.y,
            this.size
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