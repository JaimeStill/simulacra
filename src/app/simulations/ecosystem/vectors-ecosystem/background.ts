import { Sketch } from '../../../models';

export class Background {
    pixelSize: number = 24;
    offset: number = 0.01;
    start: number;
    speed: number = 0.0;

    constructor(
        public s: Sketch
    ) {
        this.start = s.p5.floor(s.p5.random(0, 1000000));
    }

    render() {
        this.s.p5.push();
        this.s.p5.noStroke();

        let xoff = this.start;
        for (let x = 0; x < this.s.width; x += this.pixelSize) {
            let yoff = this.start;

            for (let y = 0; y < this.s.height; y += this.pixelSize) {
                this.generate(x, y, xoff, yoff);
                yoff += this.offset;
            }
            xoff += this.offset;
        }
        this.speed += this.offset;
        
        this.s.p5.pop();
    }

    generate(
        x: number,
        y: number,
        xoff: number,
        yoff: number
    ) {
        const randomize = (min: number, max: number) =>
            this.s.p5.map(
                this.s.p5.noise(xoff, yoff, this.speed),
                0, 1,
                min, max
            );

        const hue = randomize(150, 241);
        const sat = 100;
        const lit = randomize(40, 81);
        const alpha = randomize(.1, .4);
        const color = this.s.p5.color(hue, sat, lit, alpha);
        this.s.p5.fill(color);
        this.s.p5.square(x, y, this.pixelSize);
    }
}