import p5 from 'p5';
import { Theme } from '../../../models';

export class Terrain {
    columns: number;
    rows: number;
    z: number[][];
    zoff: number = 0;
    grid: p5.Color;

    constructor(
        public s: p5,
        public t: Theme,
        public cellSize: number,
        public width: number,
        public height: number
    ) {
        this.grid = this.s.color(140, 100, 16, 1);

        this.columns = s.floor(this.width / this.cellSize);
        this.rows = s.floor(this.height / this.cellSize);
        this.z = this.make2dArray(this.columns, this.rows);
    }

    calculate(xoff: number, yoff: number) {
        return this.s.map(
            this.s.noise(xoff, yoff, this.zoff),
            0, 1,
            -160, 160
        );
    }

    generate() {
        let xoff = 0;
        for (let i = 0; i < this.columns; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {
                this.z[i][j] = this.calculate(xoff, yoff);
                yoff += 0.1;
            }
            xoff += 0.1;
        }
        this.zoff += 0.01;
    }

    make2dArray(columns: number, rows: number): Array<Array<number>> {
        const base = new Array<Array<number>>(columns);
        for (let i = 0; i < base.length; i++)
            base[i] = new Array<number>(rows);
        return base;
    }

    render() {
        for (let x = 0; x < this.z.length - 1; x++) {
            this.s.beginShape(this.s.QUAD_STRIP);

            for (let y = 0; y < this.z[x].length; y++) {
                this.s.stroke(this.grid);

                this.s.fill(
                    this.shade(this.z[x][y])
                );

                const vx = x * this.cellSize - this.width / 2;
                const vy = y * this.cellSize - this.height / 2;

                this.s.vertex(vx, vy, this.z[x][y]);
                this.s.vertex(vx + this.cellSize, vy, this.z[x+1][y]);
            }

            this.s.endShape();
        }
    }

    shade(elevation: number): p5.Color {
        return this.s.color(
            140,
            100,
            this.s.map(elevation, -160, 160, 10, 90),
            .8
        );
    }
}