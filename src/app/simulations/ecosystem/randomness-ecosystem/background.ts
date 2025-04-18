import p5 from 'p5';
import { Theme } from '../../../models';

export class Background {
    pixelSize: number = 24;
    offset: number = 0.01;
    start: number;
    speed: number = 0.0;

    constructor(
        public s: p5,
        public t: Theme,
        public width: number,
        public height: number
    ) {
        this.start = s.floor(s.random(0, 1000000));
    }

    render() {
        this.s.push();
        this.s.noStroke();

        let xoff = this.start;
        for (let x = 0; x < this.width - this.pixelSize; x += this.pixelSize) {
            let yoff = this.start;

            for (let y = 0; y < this.height - this.pixelSize; y += this.pixelSize) {
                this.generate(x, y, xoff, yoff);
                yoff += this.offset;
            }
            xoff += this.offset;
        }
        this.speed += this.offset;
        
        this.s.pop();
    }

    generate(
        x: number,
        y: number,
        xoff: number,
        yoff: number
    ) {
        const randomize = (min: number, max: number) =>
            this.s.map(
                this.s.noise(xoff, yoff, this.speed),
                0, 1,
                min, max
            );

        const hue = randomize(150, 241);
        const sat = 100;
        const lit = randomize(40, 81);
        const alpha = randomize(.1, .4);
        const color = this.s.color(hue, sat, lit, alpha);
        this.s.fill(color);
        this.s.square(x, y, this.pixelSize);
    }
}