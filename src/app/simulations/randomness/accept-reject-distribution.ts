import p5 from 'p5';
import { Simulation } from '../simulation';

export class AcceptRejectDistribution extends Simulation {
    private randomCounts = new Array<number>();

    constructor(element: HTMLElement) {
        super(element);
    }

    private acceptReject(s: p5) {
        while(true) {            
            const r1 = s.random(1);
            const p = r1;
            const r2 = s.random(1);

            if (r2 < p)
                return r1;
        }
    }

    protected sketch(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());

            for (let i = 0; i < 20; i++)
                this.randomCounts[i] = 0;
        }

        s.draw = () => {
            const index = s.int(
                this.acceptReject(s) * this.randomCounts.length
            );

            this.randomCounts[index]++;

            s.stroke(this.theme.green1());
            s.fill(this.theme.greenBg());

            const w = this.width / this.randomCounts.length;

            for (let x = 0; x < this.randomCounts.length; x++)
                s.rect(
                    x * w,
                    this.height - this.randomCounts[x],
                    w - 1,
                    this.randomCounts[x]
                );
        }
    }
}