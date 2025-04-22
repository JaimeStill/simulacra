import p5 from 'p5';
import { Simulation } from '../simulation';
import { Sketch } from '../../models';

export class HeliumBalloons extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const balloons: Balloon[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);

            for (let i = 0; i < 100; i++)
                balloons[i] = new Balloon(this.sketch(s));
        }

        s.draw = () => {
            s.background(this.theme.bg());

            balloons.forEach(b => {
                b.applyForce(b.heliumForce);
                b.update();
                b.checkEdges();
                b.render();
            });
        }
    }
}

class Balloon {
    hue: number;
    width: number;
    height: number;
    stringSize: number;

    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    heliumForce: p5.Vector;

    constructor(public s: Sketch) {
        const heightScale = s.p5.random(1.3, 1.7);

        this.hue = s.p5.floor(s.p5.random(0, 360));
        this.width = s.p5.floor(s.p5.random(28, 43));
        this.height = this.width * heightScale;
        this.stringSize = s.p5.randomGaussian(80, 20);

        this.position = s.p5.createVector(
            s.p5.floor(s.p5.random(this.width / 2, this.s.width - this.width / 2)),
            s.p5.floor(s.p5.random(this.s.height - 60, this.s.height - this.height / 2))
        );

        this.velocity = s.p5.createVector(0, 0);
        this.acceleration = s.p5.createVector(0, 0);

        this.heliumForce = s.p5.createVector(
            0,
            this.width * -0.0001
        );
    }

    applyForce(force: p5.Vector) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    render() {
        this.s.p5.push();

        this.s.p5.noStroke();
        this.s.p5.fill(this.hue, 100, 60, .8);

        this.s.p5.ellipse(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.s.p5.stroke(this.s.theme.color());
        this.s.p5.noFill();
        
        this.s.p5.translate(this.position.x, this.position.y + this.height / 2);
        this.s.p5.line(
            0, 0,
            0, this.stringSize
        );

        this.s.p5.pop();
    }

    checkEdges() {
        if (this.position.x > this.s.width - this.width / 2)
            this.position.x = this.s.width - this.width / 2;
        else if (this.position.x < this.width / 2)
            this.position.y = this.width / 2;

        if (this.position.y > this.s.height - this.height / 2)
            this.position.y = this.s.height - this.height / 2;
        else if (this.position.y < this.height / 2)
            this.position.y = this.height / 2;
    }
}