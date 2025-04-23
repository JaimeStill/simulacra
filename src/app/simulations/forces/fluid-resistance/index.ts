import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Liquid } from './liquid';
import { Ball } from './ball';

export class FluidResistance extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const balls: Ball[] = [];

        const liquid = new Liquid(
            this.sketch(s),
            s.createVector(
                0, this.height / 1.6
            ),
            s.createVector(
                this.width, this.height / 1.6
            ),
            0.1
        );

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initBalls();
        }

        s.draw = () => {
            s.background(this.theme.bg());
            liquid.render();

            balls.forEach(ball => {
                if (liquid.contains(ball))
                    ball.applyForce(
                        liquid.calculateDrag(ball)
                    );

                ball.update();
                ball.render();

            })
        }

        const initBalls = () => {
            for (let i = 0; i < 10; i++)
                balls[i] = new Ball(
                    this.sketch(s),
                    s.random(0.5, 3)
                );
        }
    }
}