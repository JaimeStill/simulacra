import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Ball } from './ball';

export class ThreeDBouncingBall extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    protected sketch(s: p5): void {
        const boxSize: number = this.width / 4;
        const ball: Ball = new Ball(s, boxSize, this.width, this.height);
        
        s.setup = () => {
            s.createCanvas(this.width, this.height, s.WEBGL);
            s.textFont('Consolas');
        }

        s.draw = () => {
            setScene();
            drawBox();  
            drawBall();
        }

        const setScene = () => {
            s.background(this.theme.bg());
            s.orbitControl();
            s.rotateY(s.PI / 3);
            s.rotateX(s.PI / 1.5);
        }

        const drawBox = () => {
            s.push();
            s.stroke(this.theme.purple2());
            s.noFill();
            s.box(boxSize);
            s.pop();
        }

        const drawBall = () => {
            ball.update();
            ball.checkEdges();
            ball.render();
        }
    }
}