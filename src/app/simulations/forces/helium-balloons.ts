import p5 from 'p5';
import { Simulation } from '../simulation';
import { Theme } from '../../models';

export class HeliumBalloons extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const balloons: Balloon[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);

            for (let i = 0; i < 100; i++)
                balloons[i] = new Balloon(
                    s, this.theme, this.width, this.height
                );
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

    constructor(
        public s: p5,
        public t: Theme,
        public cw: number,
        public ch: number
    ) {
        const heightScale = s.random(1.3, 1.7);

        this.hue = s.floor(s.random(0, 360));
        this.width = s.floor(s.random(28, 43));
        this.height = this.width * heightScale;
        this.stringSize = s.randomGaussian(80, 20);

        this.position =s .createVector(
            s.floor(s.random(this.width / 2, this.cw - this.width / 2)),
            s.floor(s.random(this.ch - 60, this.ch - this.height / 2))
        );

        this.velocity = s.createVector(0, 0);
        this.acceleration = s.createVector(0, 0);

        this.heliumForce = s.createVector(
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
        this.s.push();

        this.s.noStroke();
        this.s.fill(this.hue, 100, 60, .8);

        this.s.ellipse(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.s.stroke(this.t.color());
        this.s.noFill();
        
        this.s.translate(this.position.x, this.position.y + this.height / 2);
        this.s.line(
            0, 0,
            0, this.stringSize
        );

        this.s.pop();
    }

    checkEdges() {
        if (this.position.x > this.cw - this.width / 2)
            this.position.x = this.cw - this.width / 2;
        else if (this.position.x < this.width / 2)
            this.position.y = this.width / 2;

        if (this.position.y > this.ch - this.height / 2)
            this.position.y = this.ch - this.height / 2;
        else if (this.position.y < this.height / 2)
            this.position.y = this.height / 2;
    }
}