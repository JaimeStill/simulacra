import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Orientation, Repellent } from './repellent';
import { Ball } from './ball';

export class RepellingForces extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        const repellents: Repellent[] = [];
        const balls: Ball[] = [];

        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.colorMode(s.HSL);
            initRepellents();
            initBalls();
        }

        s.draw = () => {
            s.clear();
            s.background(this.theme.bg());

            repellents.forEach(r => r.render());

            balls.forEach(b => {
                repellents.forEach(r =>
                    b.applyForce(
                        r.repel(b.position)
                    )
                );

                b.update();
                b.render();
                b.checkEdges();
            });
        }

        const createRepellent = (orientation: Orientation) => new Repellent(
            this.sketch(s),
            orientation
        );

        const createBall = (mass: number) => new Ball(
            this.sketch(s),
            mass
        );

        const initRepellents = () => {
            repellents[0] = createRepellent('top');
            repellents[1] = createRepellent('right');
            repellents[2] = createRepellent('bottom');
            repellents[3] = createRepellent('left');
        }

        const initBalls = () => {
            for (let i = 0; i < 30; i++)
                balls[i] = createBall(
                    s.floor(s.random(1, 4))
                );
        }
    }
}