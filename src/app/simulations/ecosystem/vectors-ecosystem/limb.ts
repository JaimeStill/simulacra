import p5 from 'p5';

export class Limb {
    pos: p5.Vector;
    pulseRate: number;
    max: number;
    min: number;
    growing: boolean = true;

    constructor(
        public s: p5,
        v: p5.Vector
    ) {
        this.pos = v.copy();
        this.pulseRate = 1.01;
        const mag = this.pos.mag();

        this.max = s.random(
            mag + 4,
            mag + 8
        );

        this.min = s.random(
            mag - 4,
            mag - 8
        );
    }

    render(hue: number, origin: p5.Vector) {
        this.grow();

        this.s.push();

        this.s.translate(origin);
        this.s.strokeWeight(2);
        this.s.stroke(hue, 100, 30, 1);
        this.s.line(0, 0, this.pos.x, this.pos.y);

        this.s.noStroke();
        this.s.fill(hue, 100, 50, .8);
        this.s.circle(this.pos.x, this.pos.y, 8);

        this.s.pop();
    }

    private grow() {
        const mag = this.pos.mag();

        if (mag >= this.max)
            this.growing = false;
        else if (mag <= this.min)
            this.growing = true;
        
        if (this.growing)
            this.pos.mult(this.pulseRate);
        else
            this.pos.div(this.pulseRate);
    }
}