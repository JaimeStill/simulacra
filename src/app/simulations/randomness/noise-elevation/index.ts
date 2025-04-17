import p5 from 'p5';
import { Simulation } from '../../simulation';
import { Terrain } from './terrain';

export class NoiseElevation extends Simulation {
    constructor(element: HTMLElement) {
        super(element);
    }

    private calculateSize(cellBase: number) {
        const multiplier = 900;
        const power = 0.7;

        console.log('cell base', cellBase);
        
        return Math.round(
            multiplier * Math.pow(cellBase, power) / cellBase
        );
    }

    protected sketch(s: p5): void {
        let land: Terrain;
        let theta = 0.0;
        let size = this.calculateSize(Math.min(this.width, this.height));

        console.log('cell size', size);

        s.setup = () => {
            s.createCanvas(this.width, this.height, s.WEBGL);
            s.colorMode(s.HSL);
            s.background(this.theme.bg());
            land = new Terrain(s, this.theme, size, this.width, this.height);
        }

        s.draw = () => {
            s.clear();
            land.generate();

            s.push();
            s.translate(0, 20, -200);
            s.rotateX(s.PI / 3);
            s.rotateZ(theta);

            land.render();

            s.pop();

            theta += 0.0025;
        }
    }
}