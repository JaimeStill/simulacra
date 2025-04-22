import p5 from 'p5';
import { Simulation } from '../simulation';

export class RandomNumberDistribution extends Simulation {
    private total: number = 20;
    private randomCounts: number[] = [];

    constructor(element: HTMLElement) {
        super(element);
    }

    protected run(s: p5): void {
        s.setup = () => {
            s.createCanvas(this.width, this.height);
            s.background(this.theme.bg());
        
            for (let i = 0; i < this.total; i++)
                this.randomCounts[i] = 0;
        }

        s.draw = () => {
            const index = s.floor(s.random(this.total));
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