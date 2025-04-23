import p5 from 'p5';
import { Sketch } from '../../../models';
import { Ball } from './ball';

export class Liquid {
    constructor(
        public s: Sketch,
        public position: p5.Vector,
        public size: p5.Vector,
        public dragCoefficient: number
    ) { }

    contains(ball: Ball): boolean {
        return (
            ball.position.x > this.position.x
            && ball.position.x < this.position.x + this.size.x
            && ball.position.y > this.position.y
            && ball.position.y < this.position.y + this.size.y
        );
    }

    calculateDrag(ball: Ball): p5.Vector {
        const speed = ball.velocity.mag();
        const dragMagnitude = this.dragCoefficient * (speed ** 2);

        const dragForce = ball
            .velocity
            .copy()
            .mult(-1)
            .setMag(dragMagnitude);

        return dragForce;
    }

    render(): void {
        this.s.p5.push();

        this.s.p5.stroke(190, 100, 50, .9);
        this.s.p5.strokeWeight(2);
        this.s.p5.fill(190, 100, 50, .7);

        this.s.p5.rect(
            this.position.x, this.position.y,
            this.size.x, this.size.y
        );

        this.s.p5.pop();
    }
}